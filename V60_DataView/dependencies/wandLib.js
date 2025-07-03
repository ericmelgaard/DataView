"use strict";
//***wandLib.js***
//Date: 05.30.2025
//Version: 60
//compare strings for match in percent
//stringSimilarity.compareTwoStrings({string}, {string}) >= .725
// rotate one or ore elements with settings
//rotate(ele, { delay: 100, cycle: 8000, fill: 'packed', transition: 'fade'});
//filling elements should be done with code like this$('.items-wrapper[dynamicFill="true"]') 
//  <div class="items-wrapper" dynamic-fill="true"></div>
//scale or expand asset on double click events.
//animateObserver()
//trm playing observer to send messages to trmAnimate in menulayout
//fit text space allowed
//textFit({string}) >> must be visable when called to calculate width/height
//polyfil includes() ++ > any more methods just ask
//document.clearAssetStorage
//document.refreshAsset
//clear storage and refresh asset
//resetSync()
//clear sync epochs on exit to allow fresh api calls in CF and dev
//releaseVideos()
//clear video tags on unload events so webos doesn't blow up..
//TRM playing observer
//Observer V2.0 
//Mine
// Options menu functionality
function setupOptionsMenu() {
    // Create options button
    const optionsButton = document.createElement('div');
    optionsButton.className = 'options-button';
    optionsButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="options-icon">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  `;

    // Create dropdown menu
    const dropdownMenu = document.createElement('div');
    dropdownMenu.className = 'options-dropdown';
    if (!client) {
        dropdownMenu.innerHTML = `
    <div class="dropdown-item" data-action="refresh">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
      <span>Refresh</span>
    </div>
    <div class="dropdown-item" data-action="reset">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
      <span>Reset</span>
    </div>
    <div class="dropdown-item" data-action="rotate">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
      <span>Rotate</span>
    </div>
    <div class="dropdown-item" data-action="expand">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
      </svg>
      <span>Expand</span>
    </div>
  `;
    } else {
        dropdownMenu.innerHTML = `
    <div class="dropdown-item" data-action="refresh">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
      <span>Refresh</span>
    </div>
    <div class="dropdown-item" data-action="reset">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
      <span>Reset</span>
    </div>
  `;
    }


    // Create container for the options menu
    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'options-container options-hidden';
    optionsContainer.appendChild(optionsButton);
    optionsContainer.appendChild(dropdownMenu);

    // Add to document
    document.body.appendChild(optionsContainer);

    // Variables for timeout
    let hideTimeout;
    let inactivityTimeout;
    const inactivityDelay = 3000; // 3 seconds
    const optionsHideDelay = 2000; // 2 seconds for the options button itself

    // Toggle dropdown visibility
    function toggleDropdown() {
        const isVisible = dropdownMenu.classList.contains('show');
        if (isVisible) {
            dropdownMenu.classList.remove('show');
            clearTimeout(hideTimeout);
        } else {
            dropdownMenu.classList.add('show');
            // Don't set a timeout to hide the dropdown when it's toggled manually
        }
    }

    // Reset the hide timeout for dropdown
    function resetHideTimeout() {
        clearTimeout(hideTimeout);
    }

    // Show options container
    function showOptionsContainer() {
        clearTimeout(inactivityTimeout);
        $("body").css("cursor", "");
        optionsContainer.classList.remove('options-hidden');
    }

    // Hide options container after inactivity
    function hideOptionsContainer() {
        inactivityTimeout = setTimeout(() => {
            if (!dropdownMenu.classList.contains('show')) {
                optionsContainer.classList.add('options-hidden');
                $("body").css("cursor", "none");
            }
        }, optionsHideDelay);
    }

    // Event listeners
    optionsButton.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleDropdown();
    });

    optionsContainer.addEventListener('mouseenter', () => {
        clearTimeout(inactivityTimeout);
        clearTimeout(hideTimeout);
        showOptionsContainer();
    });

    dropdownMenu.addEventListener('mouseenter', () => {
        clearTimeout(hideTimeout);
        clearTimeout(inactivityTimeout);
    });

    optionsContainer.addEventListener('mousemove', () => {
        clearTimeout(hideTimeout);
        clearTimeout(inactivityTimeout);
    });

    optionsContainer.addEventListener('mouseleave', () => {
        if (!dropdownMenu.classList.contains('show')) {
            hideOptionsContainer();
        } else {
            // Only hide the dropdown if the mouse leaves the entire options container
            hideTimeout = setTimeout(() => {
                dropdownMenu.classList.remove('show');
                hideOptionsContainer();
            }, inactivityDelay);
        }
    });

    // Document-wide mouse movement tracking to show options on any hover
    document.addEventListener('mousemove', (e) => {
        // Only show options if the mouse is not already over the options container
        if (!optionsContainer.contains(e.target)) {
            showOptionsContainer();
        }
    });

    // Reset inactivity timer on any mouse movement
    let docInactivityTimeout;
    document.addEventListener('mousemove', (e) => {
        // Only start the inactivity timer if we're not hovering over the options
        if (!optionsContainer.contains(e.target)) {
            clearTimeout(docInactivityTimeout);
            docInactivityTimeout = setTimeout(() => {
                // Only hide if we're not currently interacting with the options
                if (!optionsContainer.contains(document.activeElement) &&
                    !optionsContainer.matches(':hover')) {
                    dropdownMenu.classList.remove('show');
                    optionsContainer.classList.add('options-hidden');
                    $("body").css("cursor", "none");
                }
            }, inactivityDelay);
        }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!optionsContainer.contains(e.target)) {
            dropdownMenu.classList.remove('show');
            hideOptionsContainer();
        }
    });

    // Handle dropdown item clicks
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            const action = item.getAttribute('data-action');

            const windowToggleScale = new CustomEvent('windowToggleScale');

            // Example actions (to be replaced with actual implementations)
            switch (action) {
                case 'refresh':
                    // Refresh functionality
                    document.refreshAsset();
                    break;
                case 'reset':
                    // Reset functionality
                    document.clearAssetStorage();
                    break;
                case 'rotate':
                    // Rotate functionality
                    assetRotation = assetRotation === 270 ? 0 : 270;
                    rotateAsset('.asset-wrapper', assetRotation)
                    break;
                case 'expand':
                    // Expand functionality
                    window.dispatchEvent(windowToggleScale);
                    break;
            }

            // Optional: close dropdown after action
            dropdownMenu.classList.remove('show');
        });
    });

    return {
        optionsContainer,
        optionsButton,
        dropdownMenu
    };
}

function animateObserver() {
    if (!menuLayout.trmAnimate) {
        return;
    }
    if (!client) {
        //exit it not in client
        menuLayout.trmAnimate(true, true);
        document.isPlaying = function (playing) {
            menuLayout.trmAnimate(playing);
            return "Simulate playing(" + playing + ") event..";
        };
        return;
    }
    //allow client to start animations
    if (platform === "windows" || isCF) {
        var trmConfig = {
            attributes: true
        };
        var trmPlaying = "";
        var trmCallBack = function (mutations) {
            mutations.forEach(function (mutation) {
                if (mutation.type === "attributes" && mutation.attributeName === "trm-playing") {
                    if (trmPlaying.getAttribute("trm-playing") === "false") {
                        menuLayout.trmAnimate(false);
                    }
                    if (trmPlaying.getAttribute("trm-playing") === "true") {
                        menuLayout.trmAnimate(true);
                    }
                }
            });
        };
        if (window.frameElement) {
            trmPlaying = (".zone-wrapper", self.frameElement.parentElement);
            //setup observer
            try {
                var trmObserver = new MutationObserver(trmCallBack);
                trmObserver.observe(trmPlaying, trmConfig);
            } catch (err) {
                console.log(err);
            }
        }
        //start initial animation
        menuLayout.trmAnimate(true, true);
        return;
    }
    if (platform === "webos" || platform === "chrome") {
        document.isPlaying = function (playing) {
            menuLayout.trmAnimate(playing);
        };
        //start initial animation
        menuLayout.trmAnimate(true, true);
    }
}
//scale to window size
var scale = 1; // Initial scale
var isScaled = true;
$(document).ready(function () {
    var outer = $("body");
    var wrapper = $("html");
    var maxWidth = $("body").width();
    var maxHeight = $("body").height();
    window.addEventListener("resize", resize);
    window.addEventListener("windowToggleScale", toggleScale);
    resize();
    function toggleScale(event) {
        if (isScaled) {
            window.removeEventListener("resize", resize);
            $("body").css("transform", "");
            scale = 1;
            isScaled = false;
            $("body").css("overflow", "visible");
        }
        else {
            window.addEventListener("resize", resize);
            resize();
            isScaled = true;
            $("body").css("overflow", "hidden");
        }
    }
    function resize() {
        outer = $("body");
        wrapper = $("html");
        maxWidth = $("body").width();
        maxHeight = $("body").height();
        var width = window.innerWidth;
        var height = window.innerHeight;
        scale = Math.min(width / maxWidth, height / maxHeight); // Update scale
        $(outer)[0].style.transform = 'scale(' + scale + ')';
    }
});
function rotateAsset(elm, deg) {
    // Get the computed style of the body
    const forceResize = new CustomEvent('resize');
    const bodyStyle = window.getComputedStyle(document.body);
    const bodyWidth = bodyStyle.width;
    const bodyHeight = bodyStyle.height;

    // Swap body height and width
    document.body.style.width = bodyHeight;
    document.body.style.height = bodyWidth;

    $(elm).css('margin-left', 0).css('margin-top', 0);
    $(".fallback-wrapper").css('margin-left', 0).css('margin-top', 0);
    //
    if (deg === 0 && isScaled) {
        $(elm).css('transform', 'rotate(' + deg + 'deg)');
        $(".fallback-wrapper").css('transform', 'rotate(' + deg + 'deg)');
        window.dispatchEvent(forceResize);
        return;
    }
    //    $(elm).css('transform', 'rotate('+ deg +'deg)');
    var offsetContLeft, offsetContTop, offsetLeft, offsetTop, newLeft, newTop;
    $(elm).css('transform', 'rotate(' + deg + 'deg)');
    $(".fallback-wrapper").css('transform', 'rotate(' + deg + 'deg)');
    // Get the container offset
    offsetContLeft = $(elm).parent().offset().left;
    offsetContTop = $(elm).parent().offset().top;
    // get the new rotated offset
    offsetLeft = $(elm).offset().left;
    offsetTop = $(elm).offset().top;
    // Subtract the two offsets.
    newLeft = (offsetContLeft - offsetLeft) / scale;
    newTop = (offsetContTop - offsetTop) / scale;
    // Apply the new offsets to the margin of the element.
    $(elm).css('margin-left', newLeft).css('margin-top', newTop);
    $(".fallback-wrapper").css('margin-left', newLeft).css('margin-top', newTop);

    window.dispatchEvent(forceResize);
}
//get Current Time
function currentTime() {
    if (isCF) {
        return CFTime.split("T")[0] + "T00:00:00";
    } else {
        if (!development || dateToRequest === "") {
            var tzoffset = new Date().getTimezoneOffset() * 60000;
            var localISOTime = new Date(Date.now() - tzoffset + (timeZoneOffset * 60000))
                .toISOString()
                .slice(0, -1);
            localISOTime = localISOTime.split("T")[0] + "T00:00:00";
        } else {
            localISOTime = dateToRequest + "T00:00:00";
        }
        return localISOTime;
    }
};

function resetSync() {
    return new Promise((resolve, reject) => {
        try {
            if (leader) {
                // clear syncs
                var anchors = JSON.parse(self.localStorage.getItem(AssetConfiguration.SKey + "_anchors(" + version + ")"));
                for (let key in anchors) {
                    if (anchors[key].hasOwnProperty('lastSync')) {
                        delete anchors[key].lastSync; // or set it to null: parsedData[key].lastSync = null;
                    }
                } 
                localStorage.setItem(AssetConfiguration.SKey + "_anchors(" + version + ")", JSON.stringify(anchors));
                resolve("Anchors cleared and reloaded.");
            }
        } catch (error) {
            reject("An error occurred: " + error);
        }
    });
}

function releaseVideos() {
    $('video').each(function () {
        $(this).attr('src', '');
        $(this).find('source').attr('src', ''); //catch nested sources
        this.load(); // Reload the video element to apply the changes
    });
}
document.refreshAsset = function () {
    if (leader) {
        $("body").toggleClass("blink")
        integration.cached_start();
        setTimeout(function () {
            $("body").toggleClass("blink")
        }, 1000)
    } else {
        $("body").toggleClass("blink")
        setTimeout(function () {
            $("body").toggleClass("blink")
        }, 1000)
    }
    return "Simualte refreshAsset() event";
};
//future add to digital to clear remotely
//switched to synthetic reload
document.clearAssetStorage = function () {
    if (leader) {
        new Promise(function (resolve, reject) {
            clearDatabases(false)
                .then(resolve)
                .catch(reject);
        }).then(function () {
            integration.init(leader, isUsingIndexedDB)
        });
    } else {
        integration.init(leader, isUsingIndexedDB)
    }
    return "Simulate clearAssetStorage() event";
};
//function used by asset to clear storage and ingnore TRM or client dependencies
function clearDatabases(ignore) {
    console.log("Database maintenance start..");
    return new Promise(function (resolve, reject) {
        if (isUsingIndexedDB) {
            Dexie.getDatabaseNames().then(function (dataBases) {
                var deletionPromises = [];
                dataBases.forEach(function (each) {
                    if (each.indexOf("(" + version + ")") > -1) {
                        console.log("Deleting.. " + each);
                        deletionPromises.push(Dexie.delete(each).catch(function (err) {
                            console.error("Error deleting database:", err);
                            reject(err);
                        }));
                    } else {
                        console.log("Ignoring.. " + each);
                    }
                });
                // Wait for all deletions to complete
                Promise.all(deletionPromises)
                    .then(function () {
                        console.log("DB maintenance complete");
                        // Proceed with localStorage maintenance
                        clearLocalStorage(ignore, resolve);
                    })
                    .catch(reject);
            }).catch(reject);
        } else {
            clearLocalStorage(ignore, resolve);
        }
    });
}

function clearLocalStorage(ignore, resolve) {
    var LSlength = self.localStorage.length;
    var keys = [];
    for (var i = 0; i < LSlength; i++) {
        keys.push(self.localStorage.key(i));
    }
    keys.forEach(function (each) {
        if (each.indexOf("(" + version + ")") > -1) {
            console.log("Deleting.. " + each);
            self.localStorage.removeItem(each);
        } else {
            console.log("Ignoring.. " + each);
        }
    });
    console.log("Local Storage maintenance complete");
    resolve();
}
//clean up on exits or closes so new leader can be elected.
//should I do something more in content forecaster..
window.addEventListener('beforeunload', function (event) {
    // Perform actions before the page unloads
    if (platform === "webos") {
        releaseVideos();
    }
    if (leader) {
        self.localStorage.removeItem(heartbeatKey);
    }
});
window.addEventListener('unload', function (event) {
    // Perform actions before iframe is closed or leader exits.
    if (platform === "webos") {
        releaseVideos();
    }
    if (leader) {
        self.localStorage.removeItem(heartbeatKey);
    }
});

function hide() {
    $(".fallback-wrapper").hide();
}


//Rotate V5.1
//Mine
//rotate element code on overflow
const config = {
    attributes: false,
    childList: true,
    subtree: true
};
var observerObj = [];
var queued = [];
const callback = (event, observer) => {
    var unique = [];
    event.forEach(function (each) {
        var divId = $(each.target).attr("data-rotate-id");
        if (divId && !unique[divId]) {
            unique[divId] = true;
            if (observerObj[divId].isRotating) {
                observerObj[divId].shouldReset = true;
            } else {
                //stay in sync if adding new rotation
                if ($(".rotation-wrapper").length > 0) {
                    queued.push({
                        id: divId,
                        target: each.target,
                    });
                } else {
                    observerObj[divId].rotate($(each.target), observerObj[divId].configs, observerObj[divId].data);
                }
            }
        }
    });
};
const rotateObserver = new MutationObserver(callback);
//global call function 1 or many
var rotate = function (node, options) {
    // Default settings
    var settings = $.extend({
        delay: 0,
        cycle: 8000,
        fill: 'packed',
        transition: 'fade'
    }, options);
    $(node).css("overflow", "hidden");
    setTimeout(function () {
        $(node).get().forEach(function (each, idx) {
            if ($(each).attr("data-rotate-id") !== undefined || $(each).attr("dynamic-fill") === "false") {
                return;
            }
            $("body").css("transform", "");
            var rotateId = makeid(8);
            $(each).attr("data-rotate-id", rotateId);
            if (!observerObj[rotateId]) {
                observerObj[rotateId] = new Rotate();
                observerObj[rotateId].configs = settings;
                observerObj[rotateId].data = rotateId;
                observerObj[rotateId].rotate($(each), settings, rotateId);
                rotateObserver.observe(each, config);
            }
        });
    }, settings.delay);
};

function clearQueue() {
    queued.forEach(function (each) {
        observerObj[each.id].rotate($(each.target), observerObj[each.id].configs, observerObj[each.id].data);
    });
    if (queued.length > 0) {
        console.log("queue cleared");
        queued = [];
    }
}

function makeid(length) {
    let result = "";
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}
class Rotate {
    constructor() {
        this.delay = null;
        this.cycle = null;
        this.fill = null;
        this.ele = null;
        this.data = [];
        this.transition = null;
        this.timeOut = [];
        this.hidden = false;
        this.zone = null;
        this.shouldReset = false;
        this.pass = 0;
        this.originalLength = 0;
        this.isRotating = false;
    }
    rotate(ele, obj, id) {
        this.originalHeight = ele[0].clientHeight;
        this.ele = ele;
        if (!document.body.contains($(ele)[0])) {
            const forceResize = new CustomEvent('resize');
            window.dispatchEvent(forceResize);
            return;
        }
        this.delay = obj.delay ? obj.delay * 1000 : 0;
        this.cycle = obj.cycle * 1000;
        this.fill = obj.fill ? obj.fill : "packed";
        this.transition = obj.transition ? obj.transition : "fade";
        this.id = id;
        this.build();
    }
    build() {
        var _this = this;
        this.zoneToRotate = this.ele[0];
        this.instanceID = this.id;
        $("#" + this.instanceID).empty().remove();
        if (this.zoneToRotate) {
            this.settings = [];
            this.hiddenDiv = [];
            this.itemProperties = [];
            this.groupProperties = [];
            this.zoneProperties = [];
            this.zoneProperties.overflowingHeight = false;
            this.zoneProperties.overflowingWidth = false;
            this.settings.delay = this.delay ? this.delay : 0;
            this.settings.cycle = this.cycle ? this.cycle : 0;
            this.settings.fill = this.fill ? this.fill : "";
            this.settings.transition = this.transition ? this.transition : "fade";
            this.zoneProperties.left = $(this.zoneToRotate)[0].offsetLeft;
            this.zoneProperties.top = $(this.zoneToRotate)[0].offsetTop;
            this.zoneProperties.width = $(this.zoneToRotate)[0].offsetWidth;
            this.zoneProperties.height = $(this.zoneToRotate)[0].offsetHeight;
            this.originalHeight = this.originalHeight ? this.originalHeight : $(this.zoneToRotate).height();
            this.zoneProperties.actualWidth = $(this.zoneToRotate)[0].scrollWidth;
            this.zoneProperties.actualHeight = $(this.zoneToRotate)[0].scrollHeight;
            if (this.zoneProperties.actualHeight > this.zoneProperties.height) {
                this.zoneProperties.overflowingHeight = true;
            }
            if (this.zoneProperties.actualWidth > this.zoneProperties.width) {
                this.zoneProperties.overflowingWidth = true;
            }
            if (this.zoneProperties.overflowingWidth && this.zoneProperties.overflowingHeight) {
                if ((this.zoneProperties.actualWidth - this.zoneProperties.width) > (this.zoneProperties.actualHeight - this.zoneProperties.height)) {
                    this.zoneProperties.overflowingWidth = true;
                    this.zoneProperties.overflowingHeight = false;
                } else {
                    this.zoneProperties.overflowingWidth = false;
                    this.zoneProperties.overflowingHeight = true;
                }
            }
            if (!this.zoneProperties.overflowingWidth && !this.zoneProperties.overflowingHeight) {
                $("[dynamic-fill=true]").css("opacity", "");
                const forceResize = new CustomEvent('resize');
                window.dispatchEvent(forceResize);
                return;
            }

            function isElementAbsolutelyPositioned(element) {
                // Get the computed style of the element
                var computedStyle = window.getComputedStyle(element);
                // Check if the position property is 'absolute'
                return computedStyle.position === 'absolute';
            }
            if (isElementAbsolutelyPositioned(this.zoneToRotate)) {
                var zoneWrapper = document.createElement('div');
                $(zoneWrapper).addClass("rotation-wrapper");
                $(zoneWrapper).css("top", "0px").css("height", this.originalHeight).css("width", this.originalWidth).css("position", "absolute").attr("data-rotate-id", _this.instanceID);
                zoneWrapper.id = this.id;
                $(this.zoneToRotate).parent().append(zoneWrapper);
                $(this.zoneToRotate).css("visibility", "hidden");
            } else {
                //create rotations wrapper
                var zoneWrapper = document.createElement('div');
                $(zoneWrapper).addClass("rotation-wrapper");
                $(zoneWrapper).css("top", this.zoneProperties.top).css("left", this.zoneProperties.left).css("height", this.originalHeight).css("width", this.originalWidth).css("position", "absolute").attr("data-rotate-id", _this.instanceID);
                zoneWrapper.id = this.id;
                $(this.zoneToRotate).parent().append(zoneWrapper);
                $(this.zoneToRotate).css("visibility", "hidden");
            }
            this.items = $(this.zoneToRotate).children().toArray();
            $(this.zoneToRotate).attr("isRotating", "true");
            this.page = -1;
            this.items.forEach(function (eachItem) {
                _this.pageCalc = _this.zoneProperties.overflowingHeight ? Math.floor(($(eachItem).position().top - _this.zoneProperties.top + $(eachItem).height()) / _this.zoneProperties.height) : Math.floor((eachItem.offsetLeft - _this.zoneProperties.left) / eachItem.offsetWidth);
                if (_this.pageCalc > _this.page) {
                    _this.page = _this.pageCalc;
                    _this.groupProperties.push(createDiv());
                }

                function cloneComputedStyleAndPosition(sourceElement, targetElement) {
                    // Create a temporary element of the same type
                    var tempElement = document.createElement(sourceElement.tagName);
                    document.body.appendChild(tempElement); // Append it to the body to ensure styles are applied
                    // Get computed styles of the source and temporary elements
                    var computedStyle = window.getComputedStyle(sourceElement);
                    var defaultComputedStyle = window.getComputedStyle(tempElement);
                    // Object to hold non-default styles
                    var nonDefaultStyles = {};
                    // Compare the computed styles and store the non-default ones
                    for (var i = 0; i < computedStyle.length; i++) {
                        var property = computedStyle[i];
                        var value = computedStyle.getPropertyValue(property);
                        var defaultValue = defaultComputedStyle.getPropertyValue(property);
                        if (value !== defaultValue) {
                            nonDefaultStyles[property] = value;
                        }
                    }
                    // Apply non-default styles to the target element
                    for (var property in nonDefaultStyles) {
                        targetElement.style[property] = nonDefaultStyles[property];
                    }
                    // Remove the temporary element
                    tempElement.remove();
                    // Calculate position relative to the viewport
                    var rect = sourceElement.getBoundingClientRect();
                    // Apply position properties to the target element
                    targetElement.style.position = 'absolute'; // Ensures the cloned element is positioned absolutely
                    targetElement.style.top = rect.top + 'px';
                    targetElement.style.left = rect.left + 'px';
                    targetElement.style.width = computedStyle.width;
                    targetElement.style.height = computedStyle.height;
                    // Optional: Clone margin and padding for more precise positioning
                    targetElement.style.margin = computedStyle.margin;
                    targetElement.style.padding = computedStyle.padding;
                }
                //create cloned zone
                function createDiv() {
                    var div = document.createElement('div');
                    //cloneComputedStyleAndPosition(_this.zoneToRotate, div);
                    div.id = "RG-" + _this.page + "-" + _this.instanceID;
                    div.classList.add("cloned-element");
                    $(div).css("visibility", "");
                    $(div).addClass($(_this.zoneToRotate).attr("class")).css("position", "absolute").css("visibility", "").css("height", "100%");
                    $(div).attr("dynamic-fill", false);
                    if (_this.page > 0) {
                        $(div).css("opacity", "0");
                        _this.hiddenDiv.push(div);
                    }
                    return div;
                }
                _this.itemProperties.push({
                    "page": _this.page,
                    "width": eachItem.offsetWidth,
                    "height": eachItem.offsetHeight,
                    "ele": (function () {
                        const clone = eachItem.cloneNode(true);
                        clone.data = eachItem.data ? eachItem.data : []; // Reattach custom data
                        return clone;
                    })()
                });
            });
            //add items
            this.itemProperties.forEach(function (eachItem) {
                $(eachItem.ele).addClass("cloned-element");
                $(_this.groupProperties[eachItem.page]).append(eachItem.ele);
            });
            //even out items
            if (this.settings.fill === "even" && _this.pass < 25) {
                if (_this.pass === 0) {
                    _this.originalLength = this.groupProperties.length;
                    _this.originalHeight = $(this.ele).height();
                    _this.originalWidth = $(this.ele).width();
                }
                _this.pass++;
                var averageFill = Math.floor(this.itemProperties.length / this.groupProperties.length);

                if (this.zoneProperties.overflowingWidth) {
                if (this.groupProperties.length > _this.originalLength + 1) {
                    $(this.ele).css("height", this.zoneProperties.actualHeight * 1.08);
                    _this.pass = 10000;
                    this.build(this.ele);
                    return;
                }
                if (this.groupProperties[this.groupProperties.length - 1].children.length < averageFill && this.ele[0].clientHeight > _this.originalHeight * .6 && this.groupProperties.length <= _this.originalLength + 1) {
                    $(this.ele).css("height", this.zoneProperties.height * .98);
                    this.build(this.ele);
                    return;
                }
                } else {
                    if (this.groupProperties.length > _this.originalLength + 1) {
                    $(this.ele).css("width", this.zoneProperties.actualWidth * 1.08);
                    _this.pass = 10000;
                    this.build(this.ele);
                    return;
                }
                if (this.groupProperties[this.groupProperties.length - 1].children.length < averageFill && this.ele[0].clientWidth > _this.originalWidth * .6 && this.groupProperties.length <= _this.originalLength + 1) {
                    $(this.ele).css("width", this.zoneProperties.width * .98);
                    this.build(this.ele);
                    return;
                }
                }

            }
            $(this.ele).css("height", "");
            $(this.ele).css("width", "");
            // use TRM duration if 0 duration and possibl   
            if (this.settings.cycle === 0) {
                this.settings.TRMDuration = AssetConfiguration.Duration ? AssetConfiguration.Duration : null;
                this.settings.TRMDuration = this.settings.TRMDuration && this.settings.TRMDuration != 0 ? this.settings.TRMDuration / this.groupProperties.length : 8000;
                this.settings.cycle = this.settings.TRMDuration > 4000 ? this.settings.TRMDuration : 8000;
            }
            _this.groupProperties.forEach(function (eachDiv, idx) {
                //handle last zone for flex containers
                if (idx === _this.groupProperties.length - 1) {
                    if (_this.fill != "even") {
                        $(eachDiv).css("justify-content", "normal");
                    }
                }
                $(eachDiv).attr("Duration", _this.settings.cycle / 1000);
                if (idx === 0) {
                    $(eachDiv).attr("playing", "true");
                } else {
                    $(eachDiv).attr("playing", "false");
                }
                $(zoneWrapper).append(eachDiv);
            });
            const forceResize = new CustomEvent('resize');
            window.dispatchEvent(forceResize);
            setTimeout(function () {
                _this.animate($(zoneWrapper), _this.settings.cycle, _this.settings.transition, _this.settings.delay, false);
            }, _this.settings.cycle + _this.settings.delay);
            _this.watch(zoneWrapper, _this.settings);
        }
        this.isRotating = true;
    }
    watch(zoneWrapper, settings) {
        var _this = this;
        try {
            var config = {
                attributes: true
            };
            var playing = (".zone-wrapper", self.frameElement.parentElement);
            var mutationCallBack = function (mutations) {
                mutations.forEach(function (mutation) {
                    if (mutation.type === "attributes" && mutation.attributeName === "trm-playing") {
                        if (playing.getAttribute("trm-playing") === "false" && _this.hidden === false) {
                            _this.hidden = true;
                            _this.timeOut.forEach(function (each) {
                                clearTimeout(each);
                            });
                            _this.timeOut = [];
                        }
                        if (playing.getAttribute("trm-playing") === "true" && _this.hidden === true) {
                            observer.disconnect();
                            _this.hidden = false;
                            _this.animate(_this.zone, _this.settings.cycle, _this.settings.transition, _this.delay, true);
                            observer.observe(playing, config);
                        }
                    }
                });
            };
            var observer = new MutationObserver(mutationCallBack);
            observer.observe(playing, config);
        } catch (err) {
            function stop() {
                if (document.hidden && _this.hidden != true) {
                    _this.hidden = true;
                    _this.timeOut.forEach(function (each) {
                        clearTimeout(each);
                    });
                    _this.timeOut = [];
                    console.log("hidden");
                }
                if (document.hidden === false && _this.hidden != false) {
                    _this.hidden = false;
                    _this.animate(_this.zone, _this.settings.cycle, _this.settings.transition, _this.delay, true);
                    console.log("showing");
                }
            }
            document.addEventListener("visibilitychange", stop);
        }
    }
    animate(zone, cycle, transition, delay, restart) {
        var _this = this;
        var menus = $(zone).find("[dynamic-fill='false']");
        var length = menus.length;
        var menuTransitionIndex = -1;
        var queueDelayCalc = delay > 0 ? ((cycle * length) - delay) : 0;
        _this.zone = zone;
        $(menus).hide();
        $(menus[0]).show();
        $(menus).css("opacity", "");
        if (length === 1) {
            return;
        }

        function crossFade(transition) {
            if (_this.shouldReset && menuTransitionIndex === -1) {
                _this.shouldReset = false;
                console.log("rebuilt" + "-" + _this.instanceID);
                _this.delay = 0;
                _this.pass = 0;
                _this.build();
                return;
            }
            if (_this.hidden === true) {
                $(menus).get().forEach(function (each) {
                    $(each).stop();
                });
                return;
            }
            menuTransitionIndex++;
            $(menus[menuTransitionIndex]).fadeOut("slow");
            $(menus[menuTransitionIndex]).attr("playing", "false");
            var next = menuTransitionIndex + 1;
            if (menuTransitionIndex >= length - 1) {
                menuTransitionIndex = -1;
                setTimeout(function () {
                    clearQueue();
                }, queueDelayCalc);
                $(menus.get(0)).fadeIn("slow");
                $(menus.get(0)).attr("playing", "true");
            } else {
                $(menus.get(next)).fadeIn("slow");
                $(menus.get(next)).attr("playing", "true");
            }
            _this.timeOut.push(setTimeout(function () {
                crossFade(transition);
            }, cycle));
        }
        if (restart) {
            (setTimeout(function () {
                crossFade(transition);
            }, _this.delay + cycle));
        } else {
            crossFade(transition);
        }
    }
}
//includes() polyfill
//V1.0
//objectValues()
if (!Object.values) {
  Object.values = function(obj) {
    return Object.keys(obj).map(function(key) {
      return obj[key];
    });
  };
}
//Mine
if (!Array.prototype.includes) {
    Array.prototype.includes = function (valueToFind, fromIndex) {
        if (this == null) {
            throw new TypeError('"this" is null or not defined');
        }
        var o = Object(this);
        var len = o.length >>> 0;
        if (len === 0) {
            return false;
        }
        var n = fromIndex | 0;
        var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
        while (k < len) {
            if (o[k] === valueToFind || (typeof o[k] === 'number' && typeof valueToFind === 'number' && isNaN(o[k]) && isNaN(valueToFind))) {
                return true;
            }
            k++;
        }
        return false;
    };
}
/**
 * textFit v2.3.1
 * Previously known as jQuery.textFit
 * 11/2014 by STRML (strml.github.com)
 * MIT License
 *
 * To use: textFit(document.getElementById('target-div'), options);
 *
 * Will make the *text* content inside a container scale to fit the container
 * The container is required to have a set width and height
 * Uses binary search to fit text with minimal layout calls.
 * Version 2.0 does not use jQuery.
 */
/*global define:true, document:true, window:true, HTMLElement:true*/
(function (root, factory) {
    "use strict";
    // UMD shim
    if (typeof define === "function" && define.amd) {
        // AMD
        define([], factory);
    } else if (typeof exports === "object") {
        // Node/CommonJS
        module.exports = factory();
    } else {
        // Browser
        root.textFit = factory();
    }
}(typeof global === "object" ? global : this, function () {
    "use strict";
    var defaultSettings = {
        alignVert: false, // if true, textFit will align vertically using css tables
        alignHoriz: false, // if true, textFit will set text-align: center
        multiLine: true, // if true, textFit will not set white-space: no-wrap
        detectMultiLine: true, // disable to turn off automatic multi-line sensing
        minFontSize: 28,
        maxFontSize: 50,
        reProcess: false, // if true, textFit will re-process already-fit nodes. Set to 'false' for better performance
        widthOnly: true, // if true, textFit will fit text to element width, regardless of text height
        alignVertWithFlexbox: true, // if true, textFit will use flexbox for vertical alignment
    };
    return function textFit(els, options) {
        if (!options)
            options = {};
        // Extend options.
        var settings = {};
        for (var key in defaultSettings) {
            if (options.hasOwnProperty(key)) {
                settings[key] = options[key];
            } else {
                settings[key] = defaultSettings[key];
            }
        }
        // Convert jQuery objects into arrays
        if (typeof els.toArray === "function") {
            els = els.toArray();
        }
        // Support passing a single el
        var elType = Object.prototype.toString.call(els);
        if (elType !== '[object Array]' && elType !== '[object NodeList]' &&
            elType !== '[object HTMLCollection]') {
            els = [els];
        }
        // Process each el we've passed.
        for (var i = 0; i < els.length; i++) {
            processItem(els[i], settings);
        }
    };
    /**
     * The meat. Given an el, make the text inside it fit its parent.
     * @param  {DOMElement} el       Child el.
     * @param  {Object} settings     Options for fit.
     */
    function processItem(el, settings) {
        if (!isElement(el) || (!settings.reProcess && el.getAttribute('textFitted'))) {
            return false;
        }
        // Set textFitted attribute so we know this was processed.
        if (!settings.reProcess) {
            el.setAttribute('textFitted', 1);
        }
        var innerSpan, originalHeight, originalHTML, originalWidth;
        var low, mid, high;
        // Get element data.
        originalHTML = el.innerHTML;
        originalWidth = innerWidth(el);
        originalHeight = innerHeight(el);
        // Don't process if we can't find box dimensions
        if (!originalWidth || (!settings.widthOnly && !originalHeight)) {
            if (!settings.widthOnly)
                throw new Error('Set a static height and width on the target element ' + el.outerHTML +
                    ' before using textFit!');
            else
                throw new Error('Set a static width on the target element ' + el.outerHTML +
                    ' before using textFit!');
        }
        // Add textFitted span inside this container.
        if (originalHTML.indexOf('textFitted') === -1) {
            innerSpan = document.createElement('span');
            innerSpan.className = 'textFitted';
            // Inline block ensure it takes on the size of its contents, even if they are enclosed
            // in other tags like <p>
            innerSpan.style['display'] = 'inline-block';
            innerSpan.innerHTML = originalHTML;
            el.innerHTML = '';
            el.appendChild(innerSpan);
        } else {
            // Reprocessing.
            innerSpan = el.querySelector('span.textFitted');
            // Remove vertical align if we're reprocessing.
            if (hasClass(innerSpan, 'textFitAlignVert')) {
                innerSpan.className = innerSpan.className.replace('textFitAlignVert', '');
                innerSpan.style['height'] = '';
                el.className.replace('textFitAlignVertFlex', '');
            }
        }
        // Prepare & set alignment
        if (settings.alignHoriz) {
            el.style['text-align'] = 'center';
            innerSpan.style['text-align'] = 'center';
        }
        // Check if this string is multiple lines
        // Not guaranteed to always work if you use wonky line-heights
        var multiLine = settings.multiLine;
        if (settings.detectMultiLine && !multiLine &&
            innerSpan.getBoundingClientRect().height >= parseInt(window.getComputedStyle(innerSpan)['font-size'], 10) * 2) {
            multiLine = true;
        }
        // If we're not treating this as a multiline string, don't let it wrap.
        if (!multiLine) {
            el.style['white-space'] = 'nowrap';
        }
        low = settings.minFontSize;
        high = settings.maxFontSize;
        // Binary search for highest best fit
        var size = low;
        while (low <= high) {
            mid = (high + low) >> 1;
            innerSpan.style.fontSize = mid + 'px';
            var innerSpanBoundingClientRect = innerSpan.getBoundingClientRect();
            if (innerSpanBoundingClientRect.width <= originalWidth &&
                (settings.widthOnly || innerSpanBoundingClientRect.height <= originalHeight)) {
                size = mid;
                low = mid + 1;
            } else {
                high = mid - 1;
            }
            // await injection point
        }
        // found, updating font if differs:
        if (innerSpan.style.fontSize != size + 'px')
            innerSpan.style.fontSize = size + 'px';
        // Our height is finalized. If we are aligning vertically, set that up.
        if (settings.alignVert) {
            addStyleSheet();
            var height = innerSpan.scrollHeight;
            if (window.getComputedStyle(el)['position'] === "static") {
                el.style['position'] = 'relative';
            }
            if (!hasClass(innerSpan, "textFitAlignVert")) {
                innerSpan.className = innerSpan.className + " textFitAlignVert";
            }
            innerSpan.style['height'] = height + "px";
            if (settings.alignVertWithFlexbox && !hasClass(el, "textFitAlignVertFlex")) {
                el.className = el.className + " textFitAlignVertFlex";
            }
        }
    }
    // Calculate height without padding.
    function innerHeight(el) {
        var style = window.getComputedStyle(el, null);
        return el.getBoundingClientRect().height -
            parseInt(style.getPropertyValue('padding-top'), 10) -
            parseInt(style.getPropertyValue('padding-bottom'), 10);
    }
    // Calculate width without padding.
    function innerWidth(el) {
        var style = window.getComputedStyle(el, null);
        return el.getBoundingClientRect().width -
            parseInt(style.getPropertyValue('padding-left'), 10) -
            parseInt(style.getPropertyValue('padding-right'), 10);
    }
    //Returns true if it is a DOM element
    function isElement(o) {
        return (typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
            o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string");
    }

    function hasClass(element, cls) {
        return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }
    // Better than a stylesheet dependency
    function addStyleSheet() {
        if (document.getElementById("textFitStyleSheet"))
            return;
        var style = [
            ".textFitAlignVert{",
            "position: absolute;",
            "top: 0; right: 0; bottom: 0; left: 0;",
            "margin: auto;",
            "display: flex;",
            "justify-content: center;",
            "flex-direction: column;",
            "}",
            ".textFitAlignVertFlex{",
            "display: flex;",
            "}",
            ".textFitAlignVertFlex .textFitAlignVert{",
            "position: static;",
            "}",
        ].join("");
        var css = document.createElement("style");
        css.type = "text/css";
        css.id = "textFitStyleSheet";
        css.innerHTML = style;
        document.body.appendChild(css);
    }
}));
! function (t, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.stringSimilarity = e() : t.stringSimilarity = e();
}(self, (function () {
    return t = {
            138: t => {
                function e(t, e) {
                    if ((t = t.replace(/\s+/g, "")) === (e = e.replace(/\s+/g, "")))
                        return 1;
                    if (t.length < 2 || e.length < 2)
                        return 0;
                    let r = new Map;
                    for (let e = 0; e < t.length - 1; e++) {
                        const n = t.substring(e, e + 2),
                            o = r.has(n) ? r.get(n) + 1 : 1;
                        r.set(n, o);
                    }
                    let n = 0;
                    for (let t = 0; t < e.length - 1; t++) {
                        const o = e.substring(t, t + 2),
                            s = r.has(o) ? r.get(o) : 0;
                        s > 0 && (r.set(o, s - 1), n++);
                    }
                    return 2 * n / (t.length + e.length - 2);
                }
                t.exports = {
                    compareTwoStrings: e,
                    findBestMatch: function (t, r) {
                        if (! function (t, e) {
                                return "string" == typeof t && !!Array.isArray(e) && !!e.length && !e.find((function (t) {
                                    return "string" != typeof t;
                                }));
                            }(t, r))
                            throw new Error("Bad arguments: First argument should be a string, second should be an array of strings");
                        const n = [];
                        let o = 0;
                        for (let s = 0; s < r.length; s++) {
                            const i = r[s],
                                f = e(t, i);
                            n.push({
                                target: i,
                                rating: f
                            }), f > n[o].rating && (o = s);
                        }
                        return {
                            ratings: n,
                            bestMatch: n[o],
                            bestMatchIndex: o
                        };
                    }
                };
            }
        }, e = {},
        function r(n) {
            if (e[n])
                return e[n].exports;
            var o = e[n] = {
                exports: {}
            };
            return t[n](o, o.exports, r), o.exports;
        }(138);
    var t, e;
}));

(()=>{var e={468:(e,t,o)=>{"use strict";o.r(t),o.d(t,{BotInfo:()=>l,BrowserInfo:()=>r,NodeInfo:()=>i,ReactNativeInfo:()=>s,SearchBotDeviceInfo:()=>a,browserName:()=>h,detect:()=>p,detectOS:()=>y,getNodeVersion:()=>v,parseUserAgent:()=>b});var n=function(e,t,o){if(o||2===arguments.length)for(var n,r=0,i=t.length;r<i;r++)!n&&r in t||(n||(n=Array.prototype.slice.call(t,0,r)),n[r]=t[r]);return e.concat(n||Array.prototype.slice.call(t))},r=function(e,t,o){this.name=e,this.version=t,this.os=o,this.type="browser"},i=function(e){this.version=e,this.type="node",this.name="node",this.os=process.platform},a=function(e,t,o,n){this.name=e,this.version=t,this.os=o,this.bot=n,this.type="bot-device"},l=function(){this.type="bot",this.bot=!0,this.name="bot",this.version=null,this.os=null},s=function(){this.type="react-native",this.name="react-native",this.version=null,this.os=null},d=/(nuhk|curl|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask\ Jeeves\/Teoma|ia_archiver)/,c=3,u=[["aol",/AOLShield\/([0-9\._]+)/],["edge",/Edge\/([0-9\._]+)/],["edge-ios",/EdgiOS\/([0-9\._]+)/],["yandexbrowser",/YaBrowser\/([0-9\._]+)/],["kakaotalk",/KAKAOTALK\s([0-9\.]+)/],["samsung",/SamsungBrowser\/([0-9\.]+)/],["silk",/\bSilk\/([0-9._-]+)\b/],["miui",/MiuiBrowser\/([0-9\.]+)$/],["beaker",/BeakerBrowser\/([0-9\.]+)/],["edge-chromium",/EdgA?\/([0-9\.]+)/],["chromium-webview",/(?!Chrom.*OPR)wv\).*Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],["chrome",/(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],["phantomjs",/PhantomJS\/([0-9\.]+)(:?\s|$)/],["crios",/CriOS\/([0-9\.]+)(:?\s|$)/],["firefox",/Firefox\/([0-9\.]+)(?:\s|$)/],["fxios",/FxiOS\/([0-9\.]+)/],["opera-mini",/Opera Mini.*Version\/([0-9\.]+)/],["opera",/Opera\/([0-9\.]+)(?:\s|$)/],["opera",/OPR\/([0-9\.]+)(:?\s|$)/],["pie",/^Microsoft Pocket Internet Explorer\/(\d+\.\d+)$/],["pie",/^Mozilla\/\d\.\d+\s\(compatible;\s(?:MSP?IE|MSInternet Explorer) (\d+\.\d+);.*Windows CE.*\)$/],["netfront",/^Mozilla\/\d\.\d+.*NetFront\/(\d.\d)/],["ie",/Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/],["ie",/MSIE\s([0-9\.]+);.*Trident\/[4-7].0/],["ie",/MSIE\s(7\.0)/],["bb10",/BB10;\sTouch.*Version\/([0-9\.]+)/],["android",/Android\s([0-9\.]+)/],["ios",/Version\/([0-9\._]+).*Mobile.*Safari.*/],["safari",/Version\/([0-9\._]+).*Safari/],["facebook",/FB[AS]V\/([0-9\.]+)/],["instagram",/Instagram\s([0-9\.]+)/],["ios-webview",/AppleWebKit\/([0-9\.]+).*Mobile/],["ios-webview",/AppleWebKit\/([0-9\.]+).*Gecko\)$/],["curl",/^curl\/([0-9\.]+)$/],["searchbot",/alexa|bot|crawl(er|ing)|facebookexternalhit|feedburner|google web preview|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex/]],f=[["iOS",/iP(hone|od|ad)/],["Android OS",/Android/],["BlackBerry OS",/BlackBerry|BB10/],["Windows Mobile",/IEMobile/],["Amazon OS",/Kindle/],["Windows 3.11",/Win16/],["Windows 95",/(Windows 95)|(Win95)|(Windows_95)/],["Windows 98",/(Windows 98)|(Win98)/],["Windows 2000",/(Windows NT 5.0)|(Windows 2000)/],["Windows XP",/(Windows NT 5.1)|(Windows XP)/],["Windows Server 2003",/(Windows NT 5.2)/],["Windows Vista",/(Windows NT 6.0)/],["Windows 7",/(Windows NT 6.1)/],["Windows 8",/(Windows NT 6.2)/],["Windows 8.1",/(Windows NT 6.3)/],["Windows 10",/(Windows NT 10.0)/],["Windows ME",/Windows ME/],["Windows CE",/Windows CE|WinCE|Microsoft Pocket Internet Explorer/],["Open BSD",/OpenBSD/],["Sun OS",/SunOS/],["Chrome OS",/CrOS/],["Linux",/(Linux)|(X11)/],["Mac OS",/(Mac_PowerPC)|(Macintosh)/],["QNX",/QNX/],["BeOS",/BeOS/],["OS/2",/OS\/2/]];function p(e){return e?b(e):"undefined"==typeof document&&"undefined"!=typeof navigator&&"ReactNative"===navigator.product?new s:"undefined"!=typeof navigator?b(navigator.userAgent):v()}function m(e){return""!==e&&u.reduce((function(t,o){var n=o[0],r=o[1];if(t)return t;var i=r.exec(e);return!!i&&[n,i]}),!1)}function h(e){var t=m(e);return t?t[0]:null}function b(e){var t=m(e);if(!t)return null;var o=t[0],i=t[1];if("searchbot"===o)return new l;var s=i[1]&&i[1].split(".").join("_").split("_").slice(0,3);s?s.length<c&&(s=n(n([],s,!0),function(e){for(var t=[],o=0;o<e;o++)t.push("0");return t}(c-s.length),!0)):s=[];var u=s.join("."),f=y(e),p=d.exec(e);return p&&p[1]?new a(o,u,f,p[1]):new r(o,u,f)}function y(e){for(var t=0,o=f.length;t<o;t++){var n=f[t],r=n[0];if(n[1].exec(e))return r}return null}function v(){return"undefined"!=typeof process&&process.version?new i(process.version.slice(1)):null}},213:function(e,t,o){var n,r;void 0===(r="function"==typeof(n=function(){"use strict";function t(e,t,o){var n=new XMLHttpRequest;n.open("GET",e),n.responseType="blob",n.onload=function(){l(n.response,t,o)},n.onerror=function(){console.error("could not download file")},n.send()}function n(e){var t=new XMLHttpRequest;t.open("HEAD",e,!1);try{t.send()}catch(e){}return 200<=t.status&&299>=t.status}function r(e){try{e.dispatchEvent(new MouseEvent("click"))}catch(o){var t=document.createEvent("MouseEvents");t.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),e.dispatchEvent(t)}}var i="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof o.g&&o.g.global===o.g?o.g:void 0,a=i.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),l=i.saveAs||("object"!=typeof window||window!==i?function(){}:"download"in HTMLAnchorElement.prototype&&!a?function(e,o,a){var l=i.URL||i.webkitURL,s=document.createElement("a");o=o||e.name||"download",s.download=o,s.rel="noopener","string"==typeof e?(s.href=e,s.origin===location.origin?r(s):n(s.href)?t(e,o,a):r(s,s.target="_blank")):(s.href=l.createObjectURL(e),setTimeout((function(){l.revokeObjectURL(s.href)}),4e4),setTimeout((function(){r(s)}),0))}:"msSaveOrOpenBlob"in navigator?function(e,o,i){if(o=o||e.name||"download","string"!=typeof e)navigator.msSaveOrOpenBlob(function(e,t){return void 0===t?t={autoBom:!1}:"object"!=typeof t&&(console.warn("Deprecated: Expected third argument to be a object"),t={autoBom:!t}),t.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)?new Blob(["\ufeff",e],{type:e.type}):e}(e,i),o);else if(n(e))t(e,o,i);else{var a=document.createElement("a");a.href=e,a.target="_blank",setTimeout((function(){r(a)}))}}:function(e,o,n,r){if((r=r||open("","_blank"))&&(r.document.title=r.document.body.innerText="downloading..."),"string"==typeof e)return t(e,o,n);var l="application/octet-stream"===e.type,s=/constructor/i.test(i.HTMLElement)||i.safari,d=/CriOS\/[\d]+/.test(navigator.userAgent);if((d||l&&s||a)&&"undefined"!=typeof FileReader){var c=new FileReader;c.onloadend=function(){var e=c.result;e=d?e:e.replace(/^data:[^;]*;/,"data:attachment/file;"),r?r.location.href=e:location=e,r=null},c.readAsDataURL(e)}else{var u=i.URL||i.webkitURL,f=u.createObjectURL(e);r?r.location=f:location.href=f,r=null,setTimeout((function(){u.revokeObjectURL(f)}),4e4)}});i.saveAs=l.saveAs=l,e.exports=l})?n.apply(t,[]):n)||(e.exports=r)}},t={};function o(n){var r=t[n];if(void 0!==r)return r.exports;var i=t[n]={exports:{}};return e[n].call(i.exports,i,i.exports,o),i.exports}o.d=(e,t)=>{for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{"use strict";function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(t)}function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},t(e)}function n(e,o,n,r,i,a){var l='<table style="border-collapse: collapse;" width="100%;">';!0===a&&(l+="<thead>");var s=0;if("object"!==t(o[0])){l+="<tr>";for(var d=0;d<o.length;d++)l+='<th style="'+r+'" >'+o[d]+"</th>";l+="</tr>",!0===a&&(l+="</thead>");for(var c=0;c<n.length;c++){l+='<tr style="'+i+'">';for(var u=function(t){var r=n[c][Object.keys(n[c])[t]];!0===/<[a-z][\s\S]*>/i.test(r)?l+=r:l+='<td style="'+i+'" '+("csv"===e.toLowerCase()?'width="'+o[t].flex/s*100+'%;"':"")+" >"+r+"</td>"},f=0;f<Object.keys(n[c]).length-1;f++)u(f);l+="</tr>"}l+="</table>"}else{for(var p=function(e){s+="flex"in o[e]?o[e].flex:1},m=0;m<o.length;m++)p(m);l+="<tr>";for(var h=0;h<o.length;h++)l+='<th style="'+r+'" width="'+o[h].flex/s*100+'%;" >'+o[h].alias+"</th>";l+="</tr>",!0===a&&(l+="</thead>");for(var b=0;b<n.length;b++){l+='<tr style="'+i+'">';for(var y=function(t){var r=n[b][o[t].name];l+='<td style="'+i+'" '+("csv"===e.toLowerCase()?'width="'+o[t].flex/s*100+'%;"':"")+" >"+r+"</td>"},v=0;v<o.length;v++)y(v);l+="</tr>"}}return l}var r=o(468).detect;var i=function(e){return window.btoa(unescape(encodeURIComponent(e)))},a=function(e,t){return e.replace(/{(\w+)}/g,(function(e,o){return t[o]}))},l="data:application/vnd.ms-excel;base64,",s='<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head>\x3c!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--\x3e<meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table>{table}</table></body></html>',d=o(468).detect;var c=o(213);const u=function(e,t){var o=document.createElement("iframe");return o.setAttribute("style","visibility: hidden; height: 0; width: 0; position: absolute;"),o.setAttribute("id","jsObjExporterFrameId"),o.srcdoc="</head><body>"+t+"</body></html>",o};var f=o(468).detect;function p(e){return p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},p(e)}"undefined"!=typeof window&&(window.objectExporter=function(){var t={type:"object",headers:null,exportable:null,fileName:"export",headerStyle:"font-size:16px; font-weight:bold;",cellStyle:"font-size:14px;",sheetName:"worksheet",documentTitle:"test document title",documentTitleStyle:"color:red;",repeatHeader:!0,columnSeparator:","},o=arguments[0];if(void 0===o)throw new Error("obj2csv expects at least 1 exportable!");if("object"!==p(o))throw new Error('Unexpected argument type! Expected "object", got '+p(o));if(t.exportable=o.exportable,t.type=void 0!==o.type?o.type:t.type,t.headers=void 0!==o.headers?o.headers:t.headers,t.fileName=void 0!==o.fileName?o.fileName:t.fileName,t.headerStyle=void 0!==o.headerStyle?o.headerStyle:t.headerStyle,t.cellStyle=void 0!==o.cellStyle?o.cellStyle:t.cellStyle,t.sheetName=void 0!==o.sheetName?o.sheetName:t.sheetName,t.documentTitle=void 0!==o.documentTitle?o.documentTitle:t.documentTitle,t.documentTitleStyle=void 0!==o.documentTitleStyle?o.documentTitleStyle:t.documentTitleStyle,t.repeatHeader=void 0!==o.repeatHeader?o.repeatHeader:t.repeatHeader,t.columnSeparator=void 0!==o.columnSeparator?o.columnSeparator:t.columnSeparator,!t.exportable)throw new Error("Invalid exportable!");if(!t.type||"string"!=typeof t.type)throw new Error("Invalid exportable type! only string type is acceptable!");if(-1===["csv","xls","pdf","doc","html"].indexOf(t.type.toLowerCase()))throw new Error('Invalid exportable type. Available types are "CSV", "XLS", "pdf" and "DOC".');if("boolean"!=typeof t.repeatHeader&&void 0!==t.repeatHeader)throw new Error('Invalid value for the repeat header parameter. Available types are "true" and "false".');switch(t.type){case"csv":!function(t){!function(t,o,n,r){if(t)if("object"!==e(t[0]))o.unshift(t);else{for(var i={},a=0;a<t.length;a++)i[t[a].name]=t[a].alias;o.unshift(i)}var l=function(t,o){for(var n="object"!==e(t)?JSON.parse(t):t,r="",i=0;i<n.length;i++){var a="";for(var l in n[i])a+=n[i][l]+o;r+=(a=a.substring(0,a.length-1))+"\r\n"}return r}(JSON.stringify(o),r),s=n+".csv",d=new Blob([l],{type:"text/csv;charset=utf-8;"});if(navigator.msSaveBlob)navigator.msSaveBlob(d,s);else{var c=document.createElement("a");if(void 0!==c.download){var u=URL.createObjectURL(d);c.setAttribute("href",u),c.setAttribute("download",s),c.style.visibility="hidden",document.body.appendChild(c),c.click(),document.body.removeChild(c)}}}(t.headers,t.exportable,t.fileName,t.columnSeparator)}(t);break;case"xls":!function(e){!function(e,t,o,d,c,u,f,p){var m='<span style="'+p+'">'+f+"</span><br>",h={worksheet:u,table:m+=n("xls",e,t,d,c,!1)},b=document.createElement("a"),y=o+".xls";b.setAttribute("href",l+i(a(s,h))),b.setAttribute("download",y),b.style.visibility="hidden";var v=r();if("edge"===v.name||"ie"===v.name){if(window.navigator.msSaveBlob){var w=new Blob([m],{type:"data:application/vnd.ms-excel;"});navigator.msSaveBlob(w,y)}}else document.body.appendChild(b),b.click(),document.body.removeChild(b)}(e.headers,e.exportable,e.fileName,e.headerStyle,e.cellStyle,e.sheetName,e.documentTitle,e.documentTitleStyle)}(t);break;case"pdf":!function(e){!function(e,t,o,r,i,a,l){var s=document.createElement("iframe");s.setAttribute("style","visibility: hidden; height: 0; width: 0; position: absolute;"),s.setAttribute("id","objectExporterPrintableBodyId"),s.srcdoc="<html></html>",document.getElementsByTagName("body")[0].appendChild(s);var c=document.getElementById("objectExporterPrintableBodyId");s.onload=function(){var s=d(),u=c.contentWindow||c.contentDocument;u.document&&(u=u.document);var f='<span style="'+t+'">'+e+"</span><br>";f+=n("pdf",o,r,i,a,l),u.body.innerHTML=f;var p=document.createElement("style");p.innerHTML="",u.head.appendChild(p),c.focus(),"edge"===s.name||"ie"===s.name?c.contentWindow.document.execCommand("print",!1,null):c.contentWindow.print()}}(e.documentTitle,e.documentTitleStyle,e.headers,e.exportable,e.headerStyle,e.cellStyle,e.repeatHeader)}(t);break;case"doc":!function(e){!function(e,t,o,r,i,a){for(var l="<html><body>"+n("doc",e,t,r,i,a)+"</body></html>",s=new Uint8Array(l.length),d=0;d<l.length;d++)s[d]=l.charCodeAt(d);var u=new Blob([s],{type:"text/html"});(0,c.saveAs)(u,o+".doc")}(e.headers,e.exportable,e.fileName,e.headerStyle,e.cellStyle,e.repeatHeader)}(t);break;case"html":!function(e){var t=f(),o=document.getElementById(e.exportable);if(void 0===o)throw new Error("There is no DOM object available for the requested id.");var n=u(e,o.innerHTML);document.getElementById("jsObjExporterFrameId")&&document.getElementById("jsObjExporterFrameId").remove(),document.getElementsByTagName("body")[0].appendChild(n);var r=document.getElementById("jsObjExporterFrameId");n.onload=function(){r.focus(),"edge"===t.name||"ie"===t.name?r.contentWindow.document.execCommand("print",!1,null):r.contentWindow.print()}}(t)}})})()})();
//# sourceMappingURL=objectexporter.min.js.map

