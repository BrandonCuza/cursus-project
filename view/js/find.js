$(document).ready(function(){
    /**
     * This method will be reused everytime a new event happens in this tab.
     * If there's data to be showed, it will fill the form values,
     * otherwise it will clean it. 
     * It will mainly clean if the user searches for a user that does not 
     * exists
     * @param {*} data 
     */
    function fillFindContainer(data){
        if (data){
            $("#find-name").val(data.name);
            $("#find-studentid").val(data.studentid);
            $("#find-major").val(data.major);
            $("#find-minor").val(data.minor);                               
        }else{
            $("#find-name").val("");
            $("#find-studentid").val("");
            $("#find-major").val("");
            $("#find-minor").val("");
        }      
    }
    /**
     * This is an aux function to assemble the object contact.
     * It will be used mainly to the update function
     */
    function assembleProfile(){
        let p = {};
        p.name = $("#find-name").val();
        p.email = $("#find-studentid").val();
        p.tel = $("#find-major").val();
        p.address = $("#find-minor").val();
        return p;
    }
    /**
     * This function will bind an event to the update button.
     */
    $("#btn-update-name").click(function(event){
        event.preventDefault();
        let name = $('#find-name').val();
        $.ajax({
            url: '/profile/name',
            type: 'PUT',
            data: {name: name},                        
            success: function(response){
                console.log(response);
                $("#update-delete-out").text(response.msg);                
            },                   
            error: function(xhr, status, error){
                var errorMessage = xhr.status + ': ' + xhr.statusText
                alert('Error - ' + errorMessage);
            }
        });
    });
    /**
     * This function will bind an event to the update button.
     */
    $("#btn-update-password").click(function(event){
        event.preventDefault();
        $.ajax({
            url: '/profile/password_reset',
            type: 'PUT',                        
            success: function(response){
                console.log(response);
                $("#update-delete-out").text(response.msg);                
            },                   
            error: function(xhr, status, error){
                var errorMessage = xhr.status + ': ' + xhr.statusText
                alert('Error - ' + errorMessage);
            }
        });
    });
    $.ajax({
        url: '/profile',
        type: 'GET',
        contentType: 'application/json',                        
        success: function(response){
            console.log(response);
            fillFindContainer(response);              
        },                   
        error: function(xhr, status, error){
            var errorMessage = xhr.status + ': ' + xhr.statusText
            alert('Error - ' + errorMessage);
        }
    });

    $("#btn-add-course").click(function(event){
        event.preventDefault();
        $.ajax({
            url: '/courses/?crn=92015',
            type: 'GET',
            contentType: 'application/json',                         
            success: function(response){
                let course = response[0];
                console.log(course);
                $.ajax({
                    url: '/profile/courses/add',
                    type: 'PUT',
                    data: {course: course},                        
                    success: function(response){
                        console.log(response);                
                    },                   
                    error: function(xhr, status, error){
                        var errorMessage = xhr.status + ': ' + xhr.statusText
                        alert('Error - ' + errorMessage);
                    }
                });               
            },                   
            error: function(xhr, status, error){
                var errorMessage = xhr.status + ': ' + xhr.statusText
                alert('Error - ' + errorMessage);
            }
        });
        
    });
});