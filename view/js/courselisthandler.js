$(document).ready(function(){

    let collapsed = true;

    let exclusive = "";
    $("#exclusive").on("click", (e) => {
        e.preventDefault;
        if (exclusive == "") {
            exclusive = "Y";
        } else {
            exclusive = "";
        }        
    })
    let monday = "";
    $("#monday").on("click", (e) => {
        e.preventDefault;
        if (monday == "") {
            monday = "M";
        } else {
            monday = "";
        }        
    })
    let tuesday = "";
    $("#tuesday").on("click", (e) => {
        e.preventDefault;
        if (tuesday == "") {
            tuesday = "T";
        } else {
            tuesday = "";
        }        
    })
    let wednesday = "";
    $("#wednesday").on("click", (e) => {
        e.preventDefault;
        if (wednesday == "") {
            wednesday = "W";
        } else {
            wednesday = "";
        }        
    })
    let thursday = "";
    $("#thursday").on("click", (e) => {
        e.preventDefault;
        if (thursday == "") {
            thursday = "R";
        } else {
            thursday = "";
        }        
    })
    let friday = "";
    $("#friday").on("click", (e) => {
        e.preventDefault;
        if (friday == "") {
            friday = "F";
        } else {
            friday = "";
        }        
    })
    let saturday = "";
    $("#saturday").on("click", (e) => {
        e.preventDefault;
        if (saturday == "") {
            saturday = "S";
        } else {
            saturday = "";
        }        
    })
    let sunday = "";
    $("#sunday").on("click", (e) => {
        e.preventDefault;
        if (sunday == "") {
            sunday = "U";
        } else {
            sunday = "";
        }        
    })
    let waitlist = "";
    $("#waitlist").on("click", (e) => {
        e.preventDefault;
        if (waitlist == "") {
            waitlist = "Y";
        } else {
            waitlist = "";
        }        
    })
    let precheck = "";
    $("#precheck").on("click", (e) => {
        e.preventDefault;
        if (precheck == "") {
            precheck = "Y";
        } else {
            precheck = "";
        }        
    })
    let reservelifted = "";
    $("#reservelifted").on("click", (e) => {
        e.preventDefault;
        if (reservelifted == "") {
            reservelifted = "Y";
        } else {
            reservelifted = "";
        }        
    })

    $("#expand-btn").on("click", (e) => {
        e.preventDefault
        if (collapsed) {
            $("#section-filter").css("display", "inline");
            $("#crn-filter").css("display", "inline");
            $("#slot-filter").css("display", "inline");
            $("#room-filter").css("display", "flex");
            $("#type-filter").css("display", "inline");
            $("#method-filter").css("display", "inline");
            $("#checkbox-filters").css("display", "flex");
            $("#waitlist-filter").css("display", "inline");
            $("#precheck-filter").css("display", "inline");
            $("#reservelifted-filter").css("display", "inline");
            $("#attribute-filter").css("display", "inline");
            $("#credhr-filter").css("display", "inline");
            $("#billhr-filter").css("display", "inline");
            $("#prime_instr-filter").css("display", "inline");
            $("#secnd_instr-filter").css("display", "inline");
            $("#expand-btn").html("HIDE ADVANCED FILTERS")
            collapsed = false;
        } else {
            $("#section-filter").css("display", "none");
            $("#crn-filter").css("display", "none");
            $("#slot-filter").css("display", "none");
            $("#room-filter").css("display", "none");
            $("#type-filter").css("display", "none");
            $("#method-filter").css("display", "none");
            $("#checkbox-filters").css("display", "none");
            $("#waitlist-filter").css("display", "none");
            $("#precheck-filter").css("display", "none");
            $("#reservelifted-filter").css("display", "none");
            $("#attribute-filter").css("display", "none");
            $("#credhr-filter").css("display", "none");
            $("#billhr-filter").css("display", "none");
            $("#prime_instr-filter").css("display", "none");
            $("#secnd_instr-filter").css("display", "none");
            $("#expand-btn").html("SHOW ADVANCED FILTERS")
            collapsed = true;
        }
    })

    $("#number").on("click", (e) => {
        $("#number-range").val("");
    })

    $("#number-range").on("click", (e) => {
        $("#number").val("");
    })

    $("#submitfilter").on("click", (e) => {
        e.preventDefault;
        let querystring = "";

        let subject = $("#subject").val();
        if (subject != "") {
            querystring += "subject=" + subject;
        }

        let number = $("#number").val();
        if (number != "") {
        if (querystring == "") {
            querystring += "number=" + number;
        } else {
            querystring += "&number=" + number;
        }
    }

        let numberRange = $("#number-range").val();
        if (numberRange != "") {
            if (querystring == "") {
                querystring += "number=" + numberRange;
            } else {
                querystring += "&number=" + numberRange;
            }
    }

        let name = $("#name").val();
        if (name != "") {
        if (querystring == "") {
            querystring += "name=" + name;
        } else {
            querystring += "&name=" + name;
        }
    }

        let section = $("#section").val();
        if (section != "") {
        if (querystring == "") {
            querystring += "section=" + section;
        } else {
            querystring += "&section=" + section;
        }
    }

        let crn = $("#crn").val();
        if (crn != "") {
        if (querystring == "") {
            querystring += "crn=" + crn;
        } else {
            querystring += "&crn=" + crn;
        }
    }

        let slot = $("#slot").val();
        if (slot != "") {
        if (querystring == "") {
            querystring += "slot=" + slot;
        } else {
            querystring += "&slot=" + slot;
        }
    }

        let days = "";
        days += monday;
        if (tuesday != "") {
        if (days == "") {
            days += tuesday;
        } else {
            days += ",";
            days += tuesday;
        }
        }

        if (wednesday != "") {
        if (days == "") {
            days += wednesday;
        } else {
            days += ",";
            days += wednesday;
        }
    }
        if (thursday != "") {
        if (days == "") {
            days += thursday;
        } else {
            days += ",";
            days += thursday;
        }
    }

        if (friday != "") {
        if (days == "") {
            days += friday;
        } else {
            days += ",";
            days += friday;
        }
    }

        if (saturday != "") {
        if (days == "") {
            days += friday;
        } else {
            days += ",";
            days += saturday;
        }
    }

        if (sunday != "") {
        if (days == "") {
            days += saturday;
        } else {
            days += ",";
            days += sunday;
        }
    }

        if (days != "") {
        if (querystring == "") {
                querystring += "days=" + days;
        } else {
            querystring += "&days=" + days;
        }
    }
        
        if (exclusive != "") {
            if (querystring == "") {
                querystring += "exclusive=" + exclusive;
            } else {
            querystring += "&exclusive=" + exclusive;
        } 
        }
    
        let starttime = $("#starttime").val();
        let endtime = $("#endtime").val();
        if (starttime != "" || endtime != "") {
        if (starttime != "" && endtime == "") {
            console.log("Only starttime");
            if (querystring == "") {
                querystring += "starttime=" + starttime;
            } else {
                querystring += "&starttime=" + starttime;
            }
        } else if (starttime == "" && endtime != "") {
            console.log("Only endtime");
            if (querystring == "") {
                querystring += "endtime=" + endtime;
            } else {
                querystring += "&endtime=" + endtime;
            }
        } else if (starttime != "" && endtime != "") {
            console.log("Both starttime and endtime");
            if (querystring == "") {
                querystring += "starttime=" + starttime;
                querystring += "&endtime=" + endtime;
            } else {
                querystring += "&starttime=" + starttime;
                querystring += "&endtime=" + endtime;
            }
        }
    }

        let roombuild = $("#roombuild").val();
        if (roombuild != "") {
        if (querystring == "") {
            querystring += "roombuild=" + roombuild;
        } else {
            querystring += "&roombuild=" + roombuild;
        }
    }

        let roomnumber = $("#roomnumber").val();
        if (roomnumber != "") {
        if (querystring == "") {
            querystring += "roomnumber=" + roomnumber;
        } else {
            querystring += "&roomnumber=" + roomnumber;
        }
    }

        let type = $("#type").val();
        if (type != "") {
        if (querystring == "") {
            querystring += "type=" + type;
        } else {
            querystring += "&type=" + type;
        }
    }

        let method = $("#method").val();
        if (method != "") {
        if (querystring == "") {
            querystring += "method=" + method;
        } else {
            querystring += "&method=" + method;
        }
    }

        if (waitlist != "") {
        if (querystring == "") {
            querystring += "waitlist=" + waitlist;
        } else {
            querystring += "&waitlist=" + waitlist;
        }
    }

        if (waitlist != "") {
        if (querystring == "") {
            querystring += "precheck=" + precheck;
        } else {
            querystring += "&precheck=" + precheck
        }
    }

        if (reservelifted != "") {
        if (querystring == "") {
            querystring += "reservelifted=" + reservelifted;
        } else {
            querystring += "&reservelifted=" + reservelifted;
        }
    }

        let attribute = $("#attribute").val();
        if (attribute != "") {
        let regexattribute = "/.*" + attribute +".*/i";
        if (querystring == "") {
            querystring += "attribute=" + regexattribute;
        } else {
            querystring += "&attribute=" + regexattribute;
        }
    }

        let credhr = $("#credhr").val();
        if (credhr != "") {
        if (querystring == "") {
            querystring += "credhr=" + credhr;
        } else {
            querystring += "&credhr=" + credhr;
        }
    }

        let billhr = $("#billhr").val();
        if (billhr != "") {
        if (querystring == "") {
            querystring +=  "billhr=" + billhr;
        } else {
            querystring += "&billhr=" + billhr;
        }
    }

    /*
        let prime_instr = $("#prime_instr").val();
        if (prime_instr != "") {
        let regexprime_instr = "/.*" + prime_instr +".*/     /*       i";
        if (querystring == "") {
            querystring += "prime_instr=" + regexprime_instr;
        } else {
            querystring += "&prime_instr=" + regexprime_instr;
        }
    }

        let secnd_instr = $("#secnd_instr").val();
        if (secnd_instr != "") {
        let regexsecnd_instr = "/.*" + secnd_instr +".*/           /*              i";
        if (querystring == "") {
            querystring += "secnd_instr=" + regexsecnd_instr;
        } else {
            querystring += "&secnd_instr=" + regexsecnd_instr;
        }
    }
    
        let availto = $("#availto").val();
        if (availto != "") {
        if (querystring == "") {
            querystring += "availto=" + availto;
        } else {
            querystring += "&availto=" + availto;
        }
    }

        let degree = $("#degree").val();
        if (degree != "") {
        if (querystring == "") {
            querystring += "reservefordegree=" + degree;
        } else {
            querystring += "&reservefordegree=" + degree;
        }
    }

        let major = $("#major").val();
        if (major != "") {
        if (querystring == "") {
            querystring += "reserveformajor=" + major;
        } else {
            querystring += "&reserveformajor=" + major;
        }
    }

        let minor = $("#minor").val();
        if (minor != "") {
        if (querystring == "") {
            querystring += "reserveforminor=" + minor;
        } else {
            querystring += "&reserveforminor=" + minor;
        }
    }
    */

    $.ajax({
        url: '/courses/?'+ querystring,
        type: 'GET',
        contentType: 'application/json',                        
        success: function(response){
            console.log(response)
            let ul = $("#courseul");
                ul.empty();
            if (response != "No item was found") {
                let index = 0;
                for (let course of response) {
                    let li = $(document.createElement("li"));
                    li.attr("id", "course-listing-"+String(index));
                    li.attr("class", "course-listing-temp");
                    li.attr("draggable", "true");
                    li.attr("ondragstart", "onDragStart(event)");
                    li.css("background", course.color);
                    li.css("position", "relative");
                    li.append("<div class=\"course-list-crn\" style=\"display: none;\">"+course.crn+"</div>")
                    li.append("<div class=\"course-list-subject\">"+course.subject+"</div>");
                    li.append("<div class=\"course-list-number\">"+course.number+"</div>");
                    li.append("<div class=\"course-list-name\">"+course.name+"</div>");
                    li.append("<div class=\"course-list-days\">"+course.days+"</div>");
                    li.append("<div class=\"course-list-times\">"+course.starttime+"<span>-</span>"+course.endtime+"</div>");
                    ul.append(li);
                    index += 1;
                }
            } else {
                ul.append("No matching courses found.")
            }
          
        },                   
        error: function(xhr, status, error){
            var errorMessage = xhr.status + ': ' + xhr.statusText
            alert('Error - ' + errorMessage);
        }
    });
        
    })
})

function onDragStart(e) {
    console.log("On Drag Start");
    e.dataTransfer.setData("text", e.target.id);
}

function onDragOver(e) {
    e.preventDefault();
    console.log("On Drag Over");
}

function onDrop(e) {
    console.log("On Drop")
    let id = e.dataTransfer.getData("text");
    let draggableElement = document.getElementById(id);
    $(draggableElement).css("background", "white");
    $(draggableElement).append("<div class=\"remove-course\" id=\"remove-course\" onclick=\"removeCourse(event)\" style=\"display: flex; color: red; position: absolute; bottom: 0px; right: 0px;\">X</div>");
    let dropzone = e.target;
    dropzone.appendChild(draggableElement);
    e.dataTransfer.clearData();
}