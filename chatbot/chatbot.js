document.addEventListener("DOMContentLoaded", () => {
  const chatBody = document.querySelector(".chat-body");
  const messageInput = document.querySelector(".message-input");
  const sendMessage = document.querySelector("#send-message");
  const fileInput = document.querySelector("#file-input");
  const fileUploadWrapper = document.querySelector(".file-upload-wrapper");
  const fileCancelButton = fileUploadWrapper.querySelector("#file-cancel");
  const chatbotToggler = document.querySelector("#chatbot-toggler");
  const closeChatbot = document.querySelector("#close-chatbot");

  if (!chatBody || !messageInput || !sendMessage || !fileInput || !fileUploadWrapper || !fileCancelButton || !chatbotToggler || !closeChatbot) {
    console.error("One or more required elements are missing.");
    return;
  }

  const API_KEY = "AIzaSyD53W1X1aH7086Qw71jbnVJblwYo-Nua-c";
  const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${API_KEY}`;

  const userData = {
    message: null,
    file: {
      data: null,
      mime_type: null,
    },
  };

  const chatHistory = [];
  const initialInputHeight = messageInput.scrollHeight;

  const createMessageElement = (content, ...classes) => {
    const div = document.createElement("div");
    div.classList.add("message", ...classes);
    div.innerHTML = content;
    return div;
  };

  const generateBotResponse = async (incomingMessageDiv) => {
    const messageElement = incomingMessageDiv.querySelector(".message-text");

    chatHistory.push({
      role: "user",
      parts: [{ text: userData.message }, ...(userData.file.data ? [{ inline_data: userData.file }] : [])],
    });

    const userMessageLower = userData.message.toLowerCase();
    // Manipulated Responses
    if (userMessageLower.includes("who created") || userMessageLower.includes("who made") || userMessageLower.includes("event evaluation system")) {
      setTimeout(() => {
        const customResponse = "This system was created by Kenneth Onan and Keybird Ventolina.";
        messageElement.innerText = customResponse;

        chatHistory.push({
          role: "model",
          parts: [{ text: customResponse }],
        });

        incomingMessageDiv.classList.remove("thinking");
        chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });
      }, 1000); 
      return;
    }

    if (
      userMessageLower.includes("what is this system") || 
      userMessageLower.includes("tell me about this system") || 
      userMessageLower.includes("what is this system all about")
    ) {
      setTimeout(() => {
        const customResponse =
          "This system is an Event Evaluation System designed to deliver event information to all users, specifically students across different departments. It allows users to access evaluation forms and feedback forms for events. Users can submit their responses, which are then accessible to the admin for review and analysis. This ensures smooth communication and evaluation of events within your institution.";
        messageElement.innerText = customResponse;

        chatHistory.push({
          role: "model",
          parts: [{ text: customResponse }],
        });
  
        incomingMessageDiv.classList.remove("thinking");
        chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });
      }, 1000); 
      return;
    }

    if (
      userMessageLower.includes("what is this system") || 
      userMessageLower.includes("tell me about this system") || 
      userMessageLower.includes("what is this system all about")
    ) {
      setTimeout(() => {
        const customResponse =
          "This system is an Event Evaluation System designed to deliver event information to all users, specifically students across different departments. It allows users to access evaluation forms and feedback forms for events. Users can submit their responses, which are then accessible to the admin for review and analysis. This ensures smooth communication and evaluation of events within your institution.";
        messageElement.innerText = customResponse;
  
        chatHistory.push({
          role: "model",
          parts: [{ text: customResponse }],
        });
  
        incomingMessageDiv.classList.remove("thinking");
        chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });
      }, 1000);
      return;
    }

    if (
      userMessageLower.includes("can you tour me") || 
      userMessageLower.includes("give me a tour") || 
      userMessageLower.includes("show me around the system")
    ) {
      setTimeout(() => {
        const customResponse =
          "Here's a quick tour of the system: \n" +
          "- **Event Page**: Displays all the events that have ended and can be evaluated, along with a general view of all the events. \n" +
          "- **Evaluate Page**: Allows users to answer evaluation forms and respond to questions deployed by the admin. \n" +
          "- **Feedback Page**: A space where users can provide feedback on their experiences with the events. \n" +
          "- **Notification Page**: Displays any new events that are ready for evaluation. \n" +
          "- **Profile Page**: Users can customize their profile and update personal information here. \n" +
          "- **About Us Page**: Acknowledges and recognizes all contributors to this project.";
        messageElement.innerText = customResponse;
        chatHistory.push({
          role: "model",
          parts: [{ text: customResponse }],
        });
  
        incomingMessageDiv.classList.remove("thinking");
        chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });
      }, 1000);
      return;
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: chatHistory,
      }),
    };

    try {
      const response = await fetch(API_URL, requestOptions);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error.message);

      const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
      messageElement.innerText = apiResponseText;

      chatHistory.push({
        role: "model",
        parts: [{ text: apiResponseText }],
      });
    } catch (error) {
      console.log(error);
      messageElement.innerText = error.message;
      messageElement.style.color = "#ff0000";
    } finally {
      userData.file = {};
      incomingMessageDiv.classList.remove("thinking");
      chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });
    }
  };

  const handleOutgoingMessage = (e) => {
    e.preventDefault();
    userData.message = messageInput.value.trim();
    messageInput.value = "";
    messageInput.dispatchEvent(new Event("input"));
    fileUploadWrapper.classList.remove("file-uploaded");

    const messageContent = `<div class="message-text"></div>
                            ${userData.file.data ? `<img src="data:${userData.file.mime_type};base64,${userData.file.data}" class="attachment" />` : ""}`;

    const outgoingMessageDiv = createMessageElement(messageContent, "user-message");
    outgoingMessageDiv.querySelector(".message-text").innerText = userData.message;
    chatBody.appendChild(outgoingMessageDiv);
    chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });

    setTimeout(() => {
      const messageContent = `<img class="chatbot-logo" src="style/Images/chatbot-black.png" width="35" height="35" alt="Chatbot Logo">
                             <div class="message-text">
                               <div class="thinking-indicator">
                                 <div class="dot"></div>
                                 <div class="dot"></div>
                                 <div class="dot"></div>
                               </div>
                             </div>`;

      const incomingMessageDiv = createMessageElement(messageContent, "bot-message", "thinking");
      chatBody.appendChild(incomingMessageDiv);
      chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });
      generateBotResponse(incomingMessageDiv);
    }, 600);
  };

  messageInput.addEventListener("input", () => {
    messageInput.style.height = `${initialInputHeight}px`;
    messageInput.style.height = `${messageInput.scrollHeight}px`;
    document.querySelector(".chat-form").style.borderRadius = messageInput.scrollHeight > initialInputHeight ? "15px" : "32px";
  });

  messageInput.addEventListener("keydown", (e) => {
    const userMessage = e.target.value.trim();
    if (e.key === "Enter" && !e.shiftKey && userMessage && window.innerWidth > 768) {
      handleOutgoingMessage(e);
    }
  });

  fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      fileInput.value = "";
      fileUploadWrapper.querySelector("img").src = e.target.result;
      fileUploadWrapper.classList.add("file-uploaded");
      const base64String = e.target.result.split(",")[1];

      userData.file = {
        data: base64String,
        mime_type: file.type,
      };
    };

    reader.readAsDataURL(file);
  });

  fileCancelButton.addEventListener("click", () => {
    userData.file = {};
    fileUploadWrapper.classList.remove("file-uploaded");
  });

  const picker = new EmojiMart.Picker({
    theme: "light",
    skinTonePosition: "none",
    previewPosition: "none",
    onEmojiSelect: (emoji) => {
      const { selectionStart: start, selectionEnd: end } = messageInput;
      messageInput.setRangeText(emoji.native, start, end, "end");
      messageInput.focus();
    },
    onClickOutside: (e) => {
      if (e.target.id === "emoji-picker") {
        document.body.classList.toggle("show-emoji-picker");
      } else {
        document.body.classList.remove("show-emoji-picker");
      }
    },
  });

  document.querySelector(".chat-form").appendChild(picker);

  sendMessage.addEventListener("click", (e) => handleOutgoingMessage(e));
  document.querySelector("#file-upload").addEventListener("click", () => fileInput.click());
  closeChatbot.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
  chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
});
