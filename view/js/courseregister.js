$(document).ready(function(){

    setUpCourses();    

    $("#course-change-submit").on("click", (e) => {
        elements = $("#course-list")[0].children;
        for (let li of elements) {
            if ($(li).attr("class") == "course-listing-temp") {
                let crn = li.children[0].childNodes[0].nodeValue;
                let course;
                $.ajax({
                    url: '/course/' + crn,
                    type: 'GET',
                    async: false,
                    contentType: 'application/json',                        
                    success: function(response){
                        course = response;
                    },                   
                    error: function(xhr, status, error){
                        var errorMessage = xhr.status + ': ' + xhr.statusText
                        alert('Error - ' + errorMessage);
                    }
                });

                $.ajax({
                    url: '/profile/course/add',
                    type: 'PUT',
                    contentType: 'application/json',
                    data: {"course": course},                        
                    success: function(response){
                        console.log(response);
                    },                   
                    error: function(xhr, status, error){
                        var errorMessage = xhr.status + ': ' + xhr.statusText
                        alert('Error - ' + errorMessage);
                    }
                });

            } else if ($(li).attr("class") == "delete") {
                let crn = li.children[0].childNodes[0].nodeValue;

                $.ajax({
                    url: '/course/' + crn,
                    type: 'GET',
                    contentType: 'application/json',                        
                    success: function(response){
                        course = response[0];
                    },                   
                    error: function(xhr, status, error){
                        var errorMessage = xhr.status + ': ' + xhr.statusText
                        alert('Error - ' + errorMessage);
                    }
                });

            }
        }
    });

})

function removeCourse(event) {
    let parent = event.srcElement.parentElement.id;
    if ($("#"+parent).attr("class") == "course-listing-perm") {
        $("#"+parent).attr("class", "delete");
        $("#"+parent).css("background", "pink");
    } else if ($("#"+parent).attr("class") == "delete") {
        $("#"+parent).attr("class", "course-listing");
        $("#"+parent).css("background", "white");
    } else if ($("#"+parent).attr("class") == "course-listing-temp") {
        $("#"+parent).remove();
    }
}

function setUpCourses() {
    $.ajax({
        url: '/profile',
        type: 'GET',
        contentType: 'application/json',                        
        success: function(response){
            console.log(response)
            let courses = response.courses;
            if (courses.length > 0) {
                let ul = $("#course-list");
                ul.empty();
                let index = 0;
                for (let course of courses) {
                    let li = $(document.createElement("li"));
                    li.attr("id", "course-listing-"+String(index));
                    li.attr("class", "course-listing-perm");
                    li.attr("draggable", "true");
                    li.attr("ondragstart", "onDragStart(event)");
                    li.css("background", course.color);
                    li.css("position", "relative");
                    li.append("<div class=\"course-list-subject\">"+course.subject+"</div>");
                    li.append("<div class=\"course-list-number\">"+course.number+"</div>");
                    li.append("<div class=\"course-list-name\">"+course.name+"</div>");
                    li.append("<div class=\"course-list-days\">"+course.days+"</div>");
                    li.append("<div class=\"course-list-times\">"+course.starttime+"<span>-</span>"+course.endtime+"</div>");
                    li.append("<div class=\"remove-course\" id=\"remove-course\" onclick=\"removeCourse(event)\" style=\"display: flex; color: red; position: absolute; bottom: 0px; right: 0px;\">X</div>");
                    ul.append(li);
                    index += 1;
                }
            }
        },                   
        error: function(xhr, status, error){
            var errorMessage = xhr.status + ': ' + xhr.statusText
            alert('Error - ' + errorMessage);
        }
    });
}