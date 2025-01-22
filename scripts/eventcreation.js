
function handleQuestionTypeChange(event) {
    const questionType = event.target.value;
    const questionGroup = event.target.closest('.question-group');
    const optionsContainer = questionGroup.querySelector('.additional-options');
    const addButton = questionGroup.querySelector('.add-selection');
    const deleteButton = questionGroup.querySelector('.delete-selection');

    optionsContainer.innerHTML = '';

    // Show or hide add/delete selection buttons based on question type
    if (questionType === 'multiplechoice') {
        addButton.style.display = 'inline-block';
        deleteButton.style.display = 'inline-block';
        addMultipleChoiceOptions(optionsContainer);
    } else {
        addButton.style.display = 'none';
        deleteButton.style.display = 'none';
    }

    // Dynamically add elements based on the selected question type3
    if (questionType === 'shortanswer') {
        addShortAnswerInput(optionsContainer);
    } else if (questionType === 'inparagraph') {
        addParagraphInput(optionsContainer);
    }
}

// Function to add options for Multiple Choice with editable labels
function addMultipleChoiceOptions(optionsContainer) {
    const questionIndex = optionsContainer.getAttribute('data-question-index');
    const optionIndex = optionsContainer.childElementCount;

    const option = document.createElement('div');
    option.className = 'option-item';
    option.innerHTML = `
        <label>
             <input type="radio" disabled style="appearance: none; -webkit-appearance: none; -moz-appearance: none; width: 5px; height: 5px; border: 3px solid #EC1D27; border-radius: 50%; background-color: #f0f0f0;">
            <input type="text" name="questions[${questionIndex}][options][${optionIndex}]" class="option-label" placeholder="Option ${optionIndex + 1}">
        </label>
    `;

    optionsContainer.appendChild(option);
}

// Function to add a Short Answer input box
function addShortAnswerInput(optionsContainer) {
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Your answer here';
    input.disabled = true; 
    input.style.border = '1px solid #ccc';
    input.style.padding = '8px';
    input.style.width = '90%';
    input.style.fontSize = '14px';
    input.style.borderRadius = '4px';
    optionsContainer.appendChild(input);
}

// Function to add a Paragraph input box
function addParagraphInput(optionsContainer) {
    const textarea = document.createElement('textarea');
    textarea.placeholder = 'Type your answer here';
    textarea.disabled = true; 
    textarea.rows = 4;
    textarea.style.border = '1px solid #ccc';
    textarea.style.padding = '10px';
    textarea.style.width = '90%';
    textarea.style.fontSize = '14px';
    textarea.style.borderRadius = '4px';
    optionsContainer.appendChild(textarea);
}

// Function to delete a question group
function deleteQuestionGroup(group) {
    group.remove();
}

// Function to remove the last option (for multiple choice)
function removeSelection(optionsContainer) {
    const lastOption = optionsContainer.querySelector('.option-item:last-child');
    if (lastOption) {
        lastOption.remove();
    }
}

let questionIndex = 0; // Track the number of questions added

function addNewQuestion() {
    const questionContainer = document.querySelector('.form-question');
    const newQuestionGroup = document.createElement('div');
    newQuestionGroup.classList.add('question-group', 'dynamic-question');
    newQuestionGroup.innerHTML = `
    <div class="row-question" style="display: flex;">
        <div class="question-input">
            <label for="questioninfo">Question:</label>
            <input type="text" name="questions[${questionIndex}][text]" placeholder="Question description" 
               class="question-style" 
               style="border: none; border-bottom: 2px solid #D0D0D0; outline: none; border-radius: 0px;">
        </div>
        <div class="question-type">
            <label for="questiontype">Question type:</label>
            <select name="questions[${questionIndex}][type]" class="question-type-select">
                <option value="" disabled selected hidden>Select question type</option>
                <option value="multiplechoice">Multiple Choice</option>
                <option value="shortanswer">Short Answer</option>
                <option value="inparagraph">In Paragraph</option>
            </select>
        </div>
    </div>

    <div class="row-question">
        <div class="option-group">
            <button type="button" class="add-selection" style="display: none;">Add Selection</button>
            <button type="button" class="delete-selection" style="display: none;">Delete Selection</button>
        </div>
        <div class="additional-options" data-question-index="${questionIndex}"></div>
        <div class="delete-form">
            <i class="fas fa-trash"></i>
        </div>
    </div>
    `;

    newQuestionGroup.style.display = 'block';
    newQuestionGroup.style.padding = '10px';
    newQuestionGroup.style.border = '1px solid #D0D0D0';

    questionContainer.appendChild(newQuestionGroup);

    const questionTypeSelect = newQuestionGroup.querySelector('.question-type-select');
    questionTypeSelect.addEventListener('change', handleQuestionTypeChange);

    const addSelectionBtn = newQuestionGroup.querySelector('.add-selection');
    addSelectionBtn.addEventListener('click', () =>
        addMultipleChoiceOptions(newQuestionGroup.querySelector('.additional-options'))
    );

    const deleteSelectionBtn = newQuestionGroup.querySelector('.delete-selection');
    deleteSelectionBtn.addEventListener('click', () =>
        removeSelection(newQuestionGroup.querySelector('.additional-options'))
    );

    const deleteFormIcon = newQuestionGroup.querySelector('.fa-trash');
    deleteFormIcon.addEventListener('click', () => deleteQuestionGroup(newQuestionGroup));

    questionIndex++;
}

document.querySelector('.add-question button').addEventListener('click', addNewQuestion);


document.getElementById('addQuestion').addEventListener('click', function() {
    const container = document.querySelector('.form-question');
    const count = container.children.length;
    const newGroup = document.createElement('div');
    newGroup.className = 'question-group';
    newGroup.innerHTML = `
        <input type="text" name="questions[${count}][text]" placeholder="Question Text" required>
        <select name="questions[${count}][type]">
            <option value="text">Text</option>
            <option value="multiple-choice">Multiple Choice</option>
        </select>
    `;
    container.appendChild(newGroup);
});

