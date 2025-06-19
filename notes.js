document.addEventListener('DOMContentLoaded', function() {
    // Элементы DOM
    const newNoteBtn = document.getElementById('new-note-btn');
    const emptyNewNoteBtn = document.getElementById('empty-new-note');
    const notesList = document.getElementById('notes-list');
    const noteEditor = document.getElementById('note-editor');
    const editorContent = document.querySelector('.editor-content');
    const editorEmptyState = document.querySelector('.editor-empty-state');
    const noteTitle = document.getElementById('note-title');
    const noteContent = document.getElementById('note-content');
    const noteCategory = document.getElementById('note-category');
    const noteTags = document.getElementById('note-tags');
    const saveNoteBtn = document.getElementById('save-note');
    const deleteNoteBtn = document.getElementById('delete-note');
    const noteSearch = document.getElementById('note-search');
    const categoryLinks = document.querySelectorAll('.category-link');
    const tagsContainer = document.getElementById('tags-container');
    const currentCategory = document.getElementById('current-category');
    
    // Состояние приложения
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    let currentNoteId = null;
    let currentFilter = 'all';
    let currentTagFilter = null;
    let searchQuery = '';
    
    // Инициализация
    renderNotes();
    renderTags();
    
    // Обработчики событий
    newNoteBtn.addEventListener('click', createNewNote);
    emptyNewNoteBtn?.addEventListener('click', createNewNote);
    saveNoteBtn.addEventListener('click', saveNote);
    deleteNoteBtn.addEventListener('click', confirmDeleteNote);
    noteSearch.addEventListener('input', updateSearch);
    noteContent.addEventListener('input', updateCharacterCount);
    
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            categoryLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            currentFilter = link.dataset.category;
            if (currentCategory) currentCategory.textContent = link.textContent;
            renderNotes();
        });
    });
    
    document.querySelectorAll('.format-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            formatText(btn.dataset.format);
        });
    });
    
    // Функции
    function createNewNote() {
        currentNoteId = null;
        noteTitle.value = '';
        noteContent.value = '';
        noteCategory.value = 'study';
        noteTags.value = '';
        showEditor();
        noteTitle.focus();
    }
    
    function showEditor() {
        editorEmptyState.style.display = 'none';
        editorContent.style.display = 'flex';
    }
    
    function showEmptyState() {
        editorEmptyState.style.display = 'flex';
        editorContent.style.display = 'none';
    }
    
    function saveNote() {
        const title = noteTitle.value.trim();
        const content = noteContent.value.trim();
        const category = noteCategory.value;
        const tags = noteTags.value.split(',').map(tag => tag.trim()).filter(tag => tag);
        
        if (!title) {
            showNotification('Пожалуйста, укажите заголовок заметки');
            return;
        }
        
        const now = new Date();
        const dateString = now.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
        
        const noteData = {
            id: currentNoteId || Date.now().toString(),
            title,
            content,
            category,
            tags,
            date: dateString,
            updated: now.getTime()
        };
        
        if (currentNoteId) {
            // Обновление существующей заметки
            const index = notes.findIndex(note => note.id === currentNoteId);
            if (index !== -1) {
                notes[index] = noteData;
            }
        } else {
            // Добавление новой заметки
            notes.unshift(noteData);
            currentNoteId = noteData.id;
        }
        
        localStorage.setItem('notes', JSON.stringify(notes));
        renderNotes();
        renderTags();
        showNotification('Заметка сохранена');
    }
    
    function confirmDeleteNote() {
        if (!currentNoteId) return;
        
        const confirmModal = document.getElementById('confirm-modal');
        const confirmMessage = document.getElementById('confirm-message');
        const confirmCancel = document.getElementById('confirm-cancel');
        const confirmOk = document.getElementById('confirm-ok');
        
        confirmMessage.textContent = 'Вы уверены, что хотите удалить эту заметку? Это действие нельзя отменить.';
        confirmModal.classList.add('active');
        
        function handleConfirm() {
            deleteNote();
            confirmModal.classList.remove('active');
            confirmOk.removeEventListener('click', handleConfirm);
            confirmCancel.removeEventListener('click', handleCancel);
        }
        
        function handleCancel() {
            confirmModal.classList.remove('active');
            confirmOk.removeEventListener('click', handleConfirm);
            confirmCancel.removeEventListener('click', handleCancel);
        }
        
        confirmOk.addEventListener('click', handleConfirm);
        confirmCancel.addEventListener('click', handleCancel);
    }
    
    function deleteNote() {
        notes = notes.filter(note => note.id !== currentNoteId);
        localStorage.setItem('notes', JSON.stringify(notes));
        
        currentNoteId = null;
        showEmptyState();
        renderNotes();
        renderTags();
        
        showNotification('Заметка удалена');
    }
    
    function renderNotes() {
        notesList.innerHTML = '';
        
        // Фильтрация заметок
        let filteredNotes = [...notes];
        
        if (currentFilter !== 'all') {
            filteredNotes = filteredNotes.filter(note => note.category === currentFilter);
        }
        
        if (currentTagFilter) {
            filteredNotes = filteredNotes.filter(note => 
                note.tags.includes(currentTagFilter)
            );
        }
        
        if (searchQuery) {
            filteredNotes = filteredNotes.filter(note => 
                note.title.toLowerCase().includes(searchQuery) || 
                note.content.toLowerCase().includes(searchQuery)
            );
        }
        
        // Сортировка по дате обновления (новые сначала)
        filteredNotes.sort((a, b) => b.updated - a.updated);
        
        if (filteredNotes.length === 0) {
            notesList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-sticky-note"></i>
                    <p>Нет заметок</p>
                    <button id="empty-new-note" class="btn-primary">Создать заметку</button>
                </div>
            `;
            document.getElementById('empty-new-note')?.addEventListener('click', createNewNote);
            return;
        }
        
        // Отображение заметок
        filteredNotes.forEach(note => {
            const noteElement = document.createElement('div');
            noteElement.className = `note-item ${note.id === currentNoteId ? 'active' : ''}`;
            noteElement.innerHTML = `
                <h3>${note.title}</h3>
                <p>${note.content.substring(0, 100)}${note.content.length > 100 ? '...' : ''}</p>
                <div class="note-meta">
                    <span>${note.date}</span>
                    <span>${note.tags.join(', ')}</span>
                </div>
            `;
            
            noteElement.addEventListener('click', () => {
                currentNoteId = note.id;
                loadNote(note.id);
            });
            
            notesList.appendChild(noteElement);
        });
    }
    
    function loadNote(noteId) {
        const note = notes.find(n => n.id === noteId);
        if (!note) return;
        
        noteTitle.value = note.title;
        noteContent.value = note.content;
        noteCategory.value = note.category;
        noteTags.value = note.tags.join(', ');
        document.getElementById('note-date').textContent = `Обновлено: ${note.date}`;
        updateCharacterCount();
        
        showEditor();
        renderNotes(); // Обновить выделение активной заметки
    }
    
    function renderTags() {
        if (!tagsContainer) return;
        
        tagsContainer.innerHTML = '';
        
        // Сбор всех тегов из заметок
        const allTags = notes.flatMap(note => note.tags);
        const uniqueTags = [...new Set(allTags)];
        
        // Добавление тега "Все"
        const allTagsElement = document.createElement('div');
        allTagsElement.className = `tag ${currentTagFilter === null ? 'active' : ''}`;
        allTagsElement.textContent = 'Все';
        allTagsElement.addEventListener('click', () => {
            currentTagFilter = null;
            renderTags();
            renderNotes();
        });
        tagsContainer.appendChild(allTagsElement);
        
        // Добавление остальных тегов
        uniqueTags.forEach(tag => {
            const tagElement = document.createElement('div');
            tagElement.className = `tag ${currentTagFilter === tag ? 'active' : ''}`;
            tagElement.textContent = tag;
            tagElement.addEventListener('click', () => {
                currentTagFilter = tag;
                renderTags();
                renderNotes();
            });
            tagsContainer.appendChild(tagElement);
        });
    }
    
    function updateSearch(e) {
        searchQuery = e.target.value.toLowerCase();
        renderNotes();
    }
    
    function updateCharacterCount() {
        const length = noteContent.value.length;
        document.getElementById('note-length').textContent = `${length} символов`;
    }
    
    function formatText(format) {
        const textarea = noteContent;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = textarea.value.substring(start, end);
        let newText = '';
        
        switch (format) {
            case 'bold':
                newText = `**${selectedText}**`;
                break;
            case 'italic':
                newText = `_${selectedText}_`;
                break;
            case 'heading':
                newText = `# ${selectedText}`;
                break;
            case 'list':
                newText = `- ${selectedText.replace(/\n/g, '\n- ')}`;
                break;
        }
        
        textarea.value = textarea.value.substring(0, start) + newText + textarea.value.substring(end);
        textarea.focus();
        textarea.setSelectionRange(start + newText.length, start + newText.length);
    }
    
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
});