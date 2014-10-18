
;(function($,Editor,window) {

    function submitPost() {
        var post = {
            title: $('#txtTitle').val().trim(),
            tags:[$('#txtTag').val().trim()] ,
            content:$('#txtContent').val().trim()
        };

        $.ajax({
            url:"/posts/write",
            type:"POST",
            data:JSON.stringify(post),
            dataType:"json",
            beforeSend:function(xhr) {
                xhr.setRequestHeader("Content-Type","application/json");
            }
        }).done(function(res) {
            if (res.code === "S_OK") {
                window.location.href = "/";
                return;
            }

        }).fail(function() {
            
        });
    }

    function initEvents() {
        $("#btnSubmit").on('click',submitPost);
    }

    $(function() {
        new Editor("txtContent", "divToolbar", {preview: "divPreview"});
        initEvents();
    });

})(jQuery,WMD,window);
