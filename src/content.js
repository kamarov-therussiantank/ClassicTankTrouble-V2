// TODO: Classic Lobby Settings (local only), Old Weapons?! 

window.onload = function() {
	if (!window.location.hostname.endsWith('tanktrouble.com')) return;

	// Function to create and append custom elements
	function insertElement(tagName, attributes, innerHTML, appendToId) {
		const element = document.createElement(tagName);

		for (const [attribute, value] of Object.entries(attributes)) {
			element.setAttribute(attribute, value)
		}
		element.innerHTML = innerHTML;

		document.getElementById(appendToId).appendChild(element);
	}



// Visits Snippet
	insertElement('div', {
		id: 'visitsSnippet'
	}, `
		<style>
			#visitsSnippet {
				background: #fff;
				border: #ccc 3px solid;
				border-radius: 5px;
				box-shadow: none;
				margin-bottom: 10px;
				text-align: center;
				cursor: default;
				display: inline-block;
			}
			#visitsSnippet .header {
				font-family:'TankTrouble';
				font-size: 14px;
				background: #ccc;
				color: #555;
				border-radius: 0px;
				border: #ccc 2px solid;
				margin-bottom: 5px;
				padding: 0;
                position: relative; /* Needed for positioning the tooltip */
				cursor: default;
			}
			#visitsSnippet #stats1, #stats2 {
				color: #777;
				margin-bottom: 6px;
			}	
			#statisticsSnippet .content {
				margin: 3px 1px 3px 1px;
				font-family: 'ClassicTankTrouble';
				font-size: 13px;
			}
			#statisticsSnippet .content * {
				margin: 3px 1px 3px 1px;
			}
			#statisticsSnippet .content #visits {
				font-size: 13px;
				font-weight: 600;
				margin-top: 5px;
				margin-bottom: 5px;
			}
		#stats1 {
            margin-top: 10px;
        }
        #stats2 > div, #stats2 > span {
            display: inline-block;
            vertical-align: middle; 
            margin-right: 5px;
        }
        #visitsToday, #playersOnline, #tankOwners, #loggedIn {
			color: #777;
        }
		#visits {
            font-size: 16px;
			margin-bottom: 5px;
			color: #777;
        }
.tooltip {
    display: none; /* Hidden by default */
    position: absolute;
    background-color: #333;
    color: #fff;
    padding: 5px;
    border-radius: 4px;
    bottom: 125%; /* Position above the icon */
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    z-index: 100; /* Ensures tooltip appears above other content */
    font-size: 14px; /* Adjust tooltip font size if needed */
}
#about {
    font-family:'ClassicTankTrouble';
}
#about:hover .tooltip {
    display: block;
}
		</style>
		<div class="content">
        <div class="header">Visits
		<div id="about" style="position: absolute; left: 115px; top: -1px; cursor: pointer;" title="Website details">
			<a style="text-decoration: none; font-weight: 800; color: #555;">?</a>
		</div>
		</div>
		<div id="stats1">
            Since 2007-12-16
            <div id="visits">...</div>
		</div>
        <div id="stats2">
            Today:
            <div id="visitsToday">...</div>
			<br>
			Online:
            <div id="playersOnline">...</div>
			<br>
			Tank Owners:
            <div id="tankOwners">...</div>
			<br>
			Logged in:
            <div id="loggedIn">...</div>
			<br>
        </div>
    </div>`, 'secondaryContent');

// Visits Snippet Script
// (I have just followed the code from the VM273)
TankTrouble.Statistics._updateStatistics = function() {
    Backend.getInstance().getStatistics((result) => {
        if (typeof result === 'object') {
            this._updateNumber($('#visits'), result.visits);
            this._updateNumber($('#visitsToday'), result.visitsToday); 
            this._updateNumber($('#playersOnline'), result.onlineStatistics.playerCount);
            this._updateNumber($('#tankOwners'), result.tankOwners);
            this._updateNumber($('#loggedIn'), result.onlineStatistics.playerCount);
        }
    });
};


	// App Store Snippet
	insertElement('div', {
		id: 'appStorev2Snippet',
		onclick: 'window.open("https://itunes.apple.com/app/tanktrouble-mobile-mayhem/id951971414?ls=1&mt=8", "_blank");'
	}, `
		<style>
			#appStorev2Snippet {
				background: #000;
				border-radius: 5px;
				box-shadow: none;
				margin-bottom: 10px;
				text-align: center;
				cursor: pointer;
				width: 135px;
			}
		</style>
		<div class="content">
		<img
			src="https://raw.githubusercontent.com/kamarov-therussiantank/TTCV2/main/src/assets/snippets/availableOnTheAppStore120.jpg"
			style="pointer-events: none; width: 135px;"
		>
	</div>`, 'tertiaryContent');


// Help Snippet
	insertElement('div', {
		id: 'helpSnippet'
	}, `
		<style>
			#helpSnippet {
				background: linear-gradient(to bottom, #000, #000);
				box-shadow: none;
				margin-bottom: 10px;
				text-align: center;
				border-radius: 5px;
				width: 135px;
			}
			#helpSnippet .header {
				font-family:'TankTrouble';
				font-size: 14px;
				background: none;
				color: #fff;
				border-radius: 3px;
				border: none;
				margin-bottom: 5px;
				padding: 5px 0 3px 0;
			}
			#helpSnippet .content {
				margin: 3px 1px 3px 1px;
				font-family: 'ClassicTankTrouble';
				font-size: 13px;
			}
			#helpSnippet .content * {
				margin: 3px 1px 3px 1px;
			}
		</style>
		<a href="https://tinyurl.com/ttfaqdoc" target="_blank" style="text-decoration: none;">
	<div class="content">
		<div class="header">Need Help?</div>
		<div style="color: #a4a4a4;">Check the FAQ</div>
	</div>`, 'tertiaryContent');

//Lab Messages Snippet
insertElement('div', {
	id: 'labMessagesSnippet'
}, `
	<style>
			#labMessagesSnippet {
				background: #fff;
				border: #000 3px solid;
				border-radius: 5px;
				box-shadow: none;
				margin-bottom: 10px;
				text-align: center;
				cursor: pointer;
				display: inline-block;
			}
			#labMessagesSnippet .header {
				font-family:'TankTrouble';
				font-size: 14px;
				background: #000;
				color: #fff;
				border-radius: 0px;
				border: #000 2px solid;
				margin-bottom: 5px;
				padding: 0;
			}
		</style>
<div class="content">
	<div class="header">Got Feedback?</div>
	<div style="color: #777; font-size; 13px; margin-left: 5px; margin-right: 5px;">Got ideas? Found bugs? Urge to preise us to the skies? Then give us your feedback</div>
	<img src="https://raw.githubusercontent.com/kamarov-therussiantank/TTCV2/main/src/assets/snippets/envelope.jpg" style="width: 90px; height: auto; margin-top: 10px; position: relative; left: 20px; bottom: 5px;">
</div>`, 'tertiaryContent');

//Lab Messages Snippet Script
$("#labMessagesSnippet").mousedown(function(event) {
	if (Users.hasAdminRole(UIConstants.ADMIN_ROLE_WRITE_MESSAGES)) {
		OverlayManager.pushOverlay(
			TankTrouble.AdminMessagesOverlay,
			{adminId: Users.getAdminUserForRole(UIConstants.ADMIN_ROLE_WRITE_MESSAGES)}
		);
	} else {
		OverlayManager.pushOverlay(
			TankTrouble.MessagesOverlay,
			{}
		);
	}
	event.stopPropagation();
});


	// Tell a Friend Snippet
	insertElement('div', {
		id: 'tellAFriendSnippet',
		onclick: 'window.open("https://web.archive.org/web/20150223142811/http://www.tanktrouble.com/tellAFriendMail/", "_blank", "width=460,height=535,left="+(screen.width-460)/2+",top="+(screen.height-535)/2+",resizable=0,toolbar=0,location=0,status=0,menubar=0, scrollbars=0,directories=0");'
	}, `
		<style>
			#tellAFriendSnippet {
				background: #000;
				border-radius: 5px;
				box-shadow: none;
				margin-bottom: 10px;
				text-align: center;
				cursor: pointer;
			}
			#tellAFriendSnippet .header {
				font-family:'TankTrouble';
				font-size: 14px;
				color: #fff;
				border-radius: 3px;
				margin: 1px 1px 3px 1px;
				padding: 5px 0 3px 0;
			}
			#tellAFriendSnippet .content {
				margin: 3px 1px 3px 1px;
				font-family: 'ClassicTankTrouble';
				font-size: 13px;
			}
		</style>
		<div class="content">
		<div class="header">Tell a Friend</div>
		<img
			src="https://raw.githubusercontent.com/kamarov-therussiantank/TTCV2/main/src/assets/snippets/tellAFriend.png"
			style="position: relative; top: 3px; left: 14px; pointer-events: none; width: 125px;"
		>
	</div>`, 'tertiaryContent');


// S3cret
insertElement('a', {
    id: 'twoPawsSnippet',
}, `
    <style>
#twoPawsSnippet {
    cursor: pointer;
}
.tooltip {
    display: none; /* Hidden by default */
    position: absolute;
    background-color: #333;
    color: #fff;
    padding: 5px;
    border-radius: 4px;
    bottom: 125%; /* Position above the icon */
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    z-index: 100; /* Ensures tooltip appears above other content */
    font-size: 14px; /* Adjust tooltip font size if needed */
}
#about:hover .tooltip {
    display: block;
}
    </style>
    <a id="https://ttcv2.pages.dev/bppt" title="Inspect me">
        <img
            src="https://raw.githubusercontent.com/kamarov-therussiantank/TTCV2/main/src/assets/other/twoPawsUp.png"
            style="position: absolute; bottom: 0px; left: -145px; width: 26px; height: 11px; image-rendering: pixelated;"
        >
    </a>
`, 'mainContent');

//Content injection
	//insertElement('img', {
    //    src: 'https://raw.githubusercontent.com/kamarov-therussiantank/TTCV2/main/src/assets/snippets/example.jpg',
    //    style: 'width: 90px; height: auto; margin-top: 10px; position: relative; left: 20px; bottom: 5px;'
    //}, '', 'exampleSnippet');

}();
