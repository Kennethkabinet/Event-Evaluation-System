// Function to handle question type change
function handleQuestionTypeChange(event) {
    const questionType = event.target.value;
    const questionGroup = event.target.closest('.question-group');
    const optionsContainer = questionGroup.querySelector('.additional-options');
    const addButton = questionGroup.querySelector('.add-selection');
    const deleteButton = questionGroup.querySelector('.delete-selection');

    // Clear previous options
    optionsContainer.innerHTML = '';

    // Show or hide add/delete selection buttons based on question type
    if (questionType === 'multiplechoice') {
        addButton.style.display = 'inline-block';
        deleteButton.style.display = 'inline-block';
        addMultipleChoiceOptions(optionsContainer); // Start with one option for multiple choice
    } else {
        addButton.style.display = 'none';
        deleteButton.style.display = 'none';
    }

    // Dynamically add elements based on the selected question type
    if (questionType === 'shortanswer') {
        addShortAnswerInput(optionsContainer);
    } else if (questionType === 'inparagraph') {
        addParagraphInput(optionsContainer);
    }
}

// Function to add options for Multiple Choice with editable labels
function addMultipleChoiceOptions(optionsContainer) {
    const option = document.createElement('div');
    option.className = 'option-item';
    option.innerHTML = ` 
        <label>
            <input type="radio" name="option">
            <input type="text" class="option-label" placeholder="Rename selection ${optionsContainer.childElementCount + 1}">
        </label>
    `;
    
    // Append the new option below the add selection button
    optionsContainer.appendChild(option);  // Using appendChild to add below
}

// Function to add a Short Answer input box
function addShortAnswerInput(optionsContainer) {
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Your answer here';
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

// Function to add new question to the form
function addNewQuestion() {
    const questionContainer = document.querySelector('.form-question');
    const newQuestionGroup = document.createElement('div');
    newQuestionGroup.classList.add('question-group', 'dynamic-question');
    newQuestionGroup.innerHTML = `
    <div class="row-question" style="display: flex;">
        <div class="question-input">
            <label for="questioninfo">Question:</label>
            <input type="text" name="questioninfo" id="questioninfo" placeholder="Question description">
        </div>
        <div class="question-type">
            <label for="questiontype">Question type:</label>
            <select id="questiontype" name="questiontype">
                <option value="" disabled selected hidden>Select question type</option>
                <option value="multiplechoice">Multiple Choice</option>
                <option value="shortanswer">Short Answer</option>
                <option value="inparagraph">In Paragraph</option>
            </select>
        </div>
    </div>

    <div class="row-question">
        <div class="option-group">
            <label>
                <button type="button" class="add-selection">Add Selection</button>
                <button type="button" class="delete-selection">Delete Selection</button>
            </label>
        </div>
        <div class="additional-options"></div>
        <div class="delete-form">
            <i class="fas fa-trash"></i>
        </div>
    </div>
    `;

    // Apply inline styles if necessary
    newQuestionGroup.style.display = 'block';
    newQuestionGroup.style.padding = '10px';
    newQuestionGroup.style.border = '1px solid #D0D0D0';

    questionContainer.appendChild(newQuestionGroup);

    // Add event listeners
    const questionTypeSelect = newQuestionGroup.querySelector('.question-type select');
    questionTypeSelect.addEventListener('change', handleQuestionTypeChange);

    const addSelectionBtn = newQuestionGroup.querySelector('.add-selection');
    addSelectionBtn.addEventListener('click', () => addMultipleChoiceOptions(newQuestionGroup.querySelector('.additional-options')));

    const deleteSelectionBtn = newQuestionGroup.querySelector('.delete-selection');
    deleteSelectionBtn.addEventListener('click', () => removeSelection(newQuestionGroup.querySelector('.additional-options')));

    const deleteFormIcon = newQuestionGroup.querySelector('.fa-trash');
    deleteFormIcon.addEventListener('click', () => deleteQuestionGroup(newQuestionGroup));
}

document.querySelector('.add-question button').addEventListener('click', addNewQuestion);
