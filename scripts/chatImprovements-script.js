// Injection 
if (window.location.hostname.includes("tanktrouble.com")) {
    function injectJSCode(code) {
        const scriptElement = document.createElement('script');
        scriptElement.setAttribute('type', 'text/javascript');
        scriptElement.textContent = code;
        document.documentElement.appendChild(scriptElement);
    }

    function injectJSLink(src) {
        const scriptElement = document.createElement('script');
        scriptElement.setAttribute('type', 'text/javascript');
        scriptElement.setAttribute('src', src);
        document.documentElement.appendChild(scriptElement);
    }

  // Function to dynamically add custom CSS
const addCustomStyle = css => document.head.appendChild(document.createElement("style")).innerHTML = css;

  // Get the hostname of the current website
const site = window.location.hostname;
if (site.includes("tanktrouble.com")) {
   addCustomStyle(`
#chat {
  /*Move it to the bottom left*/
  inset: calc(100% - 30px) auto auto 34px !important;
  /*Disable drop shadow filter*/
  filter: none;
  -webkit-filter: none;
}
/*Reverse the chat flow*/
#chat,
#chat .content,
#chat .body {
  display: flex;
  flex-direction: column-reverse;
}
#chat .status.button {
  transform: translate(7px, -18px);
  cursor: initial;
  z-index: 1;
}
#chat form {
  width: 200px;
  margin-left: 20px;
  background: #ececec;
}
#chat form[style*="repeating-linear-gradient"] {
  background: #d0d0d0 !important;
}
#chat:not(.open) form {
  display: none;
}
#chat textarea {
  left: 5px;
  transition: width 0s !important;
}
#chat .body {
  padding-right: 10px;
  border-radius: 3px;
  background: linear-gradient(225deg, #00000005 12px, #00000014 12px, #00000014 100%);
  margin-bottom: 7px;
  top: 0 !important;
  -webkit-mask-image: linear-gradient(225deg, #000000 11px, #00000000 12px, #00000000 100% ),
	linear-gradient(to top, #000000 70%, rgba(0, 0, 0, 0.11));
}
#chat .body .chatMessage svg {
  padding: 2px 4px 1px 4px;
  border-left: 2px dotted rgb(170, 170, 170);
  filter: drop-shadow(1px 1px 1px #00000022);
}
#chat .body.dragging {
  border: none !important;
  margin-left: 20px !important;
}
/*Rotate and align the handle to top-right*/
.handle.ui-resizable-ne[src*="resizeHandleBottomRight.png"] {
  width: 12px;
  height: 12px !important;
  transform: translateX(6px) rotate(-90deg);
  z-index: 2147483647;
  position: sticky;
  left: calc(100% - 7px);
  top: 0;
  order: 0;
  margin-bottom: auto !important;
}
body:has(#chat .body.ui-resizable-resizing) .ui-resizable-handle.handle.ui-resizable-ne {
  display: none !important;
}
 
/* Scrollbar */
#chat .body {
  scrollbar-gutter: stable;
  scrollbar-width: thin;
  scrollbar-color: rgb(170, 170, 170) transparent;
  align-items: end;
  direction: rtl;
  pointer-events: auto;
  overflow-x: hidden;
  overflow-y: hidden;
}
#chat .body:hover {
  overflow-y: scroll;
}
#chat .body .chatMessage {
  direction: ltr;
  margin-left: ${(/Chrome.*Safari/u).test(navigator.userAgent) ? '3px' : '5px'};
}
#chat .body::-webkit-scrollbar {
  width: 3px;
}
#chat .body::-webkit-scrollbar-track {
  background: transparent;
}
#chat .body::-webkit-scrollbar-thumb {
  background: rgb(170, 170, 170);
}
`);
 
/**
 * Reconfigure the chat handle to be dragging
 * from the south-east direction (down)
 * to the north-east direction (up)
 */
const changeHandleDirection = () => {
	const { resizable } = $.fn;
 
	// Use a regular function to keep context
	$.fn.resizable = function(...args) {
		const [config] = args;
 
		// Reassign the chat handle to be north-east facing
		if (config.handles) {
			const handle = config.handles.se;
			if (handle === TankTrouble.ChatBox.chatBodyResizeHandle) {
				handle.removeClass('ui-resizable-se')
					.addClass('ui-resizable-ne');
 
				config.handles.ne = handle;
				delete config.handles.se;
 
				// Set a taller chat maxHeight
				config.maxHeight = 650;
			}
		}
 
		return resizable.call(this, config);
	};
};
 
/**
 * Hook message render functions to disable jquery .show() animation
 * This fixes chat messages not showing up in the reversed chat order
 */
const fixChatRendering = () => {
	Loader.hookFunction(TankTrouble.ChatBox, '_renderChatMessage', (original, ...args) => {
		// Set animateHeight to false
		args[9] = false;
		original(...args);
	});
 
	Loader.hookFunction(TankTrouble.ChatBox, '_renderSystemMessage', (original, ...args) => {
		// Set animateHeight to false
		args[3] = false;
		original(...args);
	});
};
 
/**
 * Prevent TankTrouble from clearing the chat when the client disconnects
 * Print message to chat when client switches server to separate conversations
 */
const preventChatClear = () => {
	Loader.hookFunction(TankTrouble.ChatBox, '_clearChat', (original, ...args) => {
		const isUnconnected = ClientManager.getClient().getState() === TTClient.STATES.UNCONNECTED;
 
		// Void the call if the client is unconnected
		// when the function is invoked
		if (isUnconnected) return null;
 
		return original(...args);
	});
 
	Loader.hookFunction(TankTrouble.ChatBox, '_updateStatusMessageAndAvailability', (original, ...args) => {
		const [systemMessageText, guestPlayerIds] = args;
 
		// Check for welcome message
		// If true, print a system message
		if (systemMessageText === 'Welcome to TankTrouble Comms § § ') {
			const newServer = ClientManager.getAvailableServers()[ClientManager.multiplayerServerId];
			return original(`Connected to ${ newServer.name } ${ guestPlayerIds.length ? '§ ' : '' }`, guestPlayerIds);
		}
		return original(...args);
	});
};
 
/**
 * Write the chat savestate to storage and return
 * @returns Promise for last savestate
 */
const startChatSavestate = () => {
	Loader.hookFunction(TankTrouble.ChatBox, 'open', (original, ...args) => {
		GM_setValue('chat-open', true);
		original(...args);
	});
	Loader.hookFunction(TankTrouble.ChatBox, 'close', (original, ...args) => {
		GM_setValue('chat-open', false);
		original(...args);
	});
 
	// Get savestate and default to chat being open
	return GM_getValue('chat-open', true);
};
 
changeHandleDirection();
fixChatRendering();
Loader.whenContentInitialized().then(async() => {
	preventChatClear();
 
	const shouldChatOpen = await startChatSavestate();
	if (shouldChatOpen) TankTrouble.ChatBox.open();
 
	// Get the plain nodes for better performance
	// eslint-disable-next-line prefer-destructuring
	const chatBody = TankTrouble.ChatBox.chatBody[0];
	// eslint-disable-next-line prefer-destructuring
	const chatForm = TankTrouble.ChatBox.chatForm[0];
	// eslint-disable-next-line prefer-destructuring
	const chatInput = TankTrouble.ChatBox.chatInput[0];
 
	// Create a mutation observer that looks for changes in the chatBody's attributes (namely width)
	new MutationObserver(() => {
		const width = Number(chatBody.offsetWidth || 220);
 
		chatForm.style.width = `${width}px`;
		chatInput.style.width = `${width - 12}px`;
	}).observe(chatBody, {
		attributes: true,
		characterData: false
	});
 
	chatForm.style.width = '220px';
	chatInput.style.width = `${chatForm.offsetWidth - 12}px`;
 
	// Allow more characters in the chat input
	chatInput.setAttribute('maxlength', '255');
});
