/*
 *
 *Copyright 2016 Jeffrey Meng
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 
 */
/*
A helper for clipboardjs.
Requires Bootstrap Tooltip Plugin JS
Shows tooltips for Copy To Clipboard, Copied!, and press CMD/CTRL C to copy
*/
/* global $ Clipboard navigator */
/* 
DOCS:
run bootstrapClipboardHelperInit(clipboard) to initate.
PARAMS:
clipboard: the object returned by new Clipboard.

EX:
var clipboard = new CLipboard(".btn");
bootstrapClipboardHelperInit(clipboard);

RESULT:
After text is copied, says Copied!
After Error, says Press CMD(⌘) + C to copy OR Press CTRL + C to copy OR Copying Unvaliable on IOS depending on user agent
*/
function bootstrapClipboardHelperInit(clipboard) {
    function showTooltip(text, id) {
        
        $("#" + id).tooltip({title:text});
        $("#" + id).tooltip("show");
        setTimeout(function(){$("#" + id).tooltip("hide");$("#" + id).tooltip("destroy");}, 3000)
        
    }
    var platform = (navigator.platform.match(/(Mac)/i) ? true : false) ? "mac" : ((navigator.platform.match(/(iPhone|iPod|iPad)/i) ? true : false) ? "ios" : "windows");
    var error = navigator !== "ios" ? ("Press " + (navigator === "mac" ? "CMD(⌘)" : "CTRL") + " + C to copy") : "Copying Unvaliable on IOS";
    var success = "copied!";
    
    clipboard.on('success', function(e) {
        console.info('Action:', e.action);
        console.info('Text:', e.text);
        console.info('Trigger:', e.trigger);
        alert($(e.trigger).parent().attr("id"));

        e.clearSelection();
    });

    clipboard.on('error', function(e) {
        console.error('Action:', e.action);
        console.error('Trigger:', e.trigger);
    });

    function showTooltip(text) {
        setTimeout(
            function() {

            }, 3000);
    }
}