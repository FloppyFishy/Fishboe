var doneIt = false;
function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
            /* Make an HTTP request using the attribute value as the file name: */
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) {elmnt.innerHTML = this.responseText; }
                    if (this.status == 404) {elmnt.innerHTML = "Page not found."; }
                    /* Remove the attribute, and call this function once more: */
                    
                    var navBarItem = elmnt.getElementsByTagName('li');
                    for(var i = 0; i < navBarItem.length; i++) {
                        if (navBarItem[i].innerHTML.includes("Home") && document.title == "Fishboe Home") {
                            navBarItem[i].parentElement.removeChild(navBarItem[i]);
                            break;
                        }
                        else if (navBarItem[i].innerHTML.includes(document.title)) {
                            navBarItem[i].parentElement.removeChild(navBarItem[i]);
                            break;
                        }
                    }

                    elmnt.removeAttribute("w3-include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /* Exit the function: */
            return;
        }
    }
}

includeHTML();
