;
(function($, Editor, window) {

	var id = postId;

	function submitPost() {
		var post = {
			title: $('#txtTitle').val().trim(),
			tags: [$('#txtTag').val().trim()],
			content: $('#txtContent').val().trim()
		};

		var url = (id === "") ? "/posts/write": ("/posts/update/" + id);
		$.ajax({
			url: url,
			type: "POST",
			data: JSON.stringify(post),
			dataType: "json",
			beforeSend: function(xhr) {
				xhr.setRequestHeader("Content-Type", "application/json");
			}
		}).done(function(res) {
			if (res.code === "S_OK") {
				window.location.href = "/";
				return;
			}

		}).fail(function() {

		});
	}

    function showTagListTip () {
        var val = $(this).val().trim();

        var htmlBuf = [];
        $.each(tagList, function(index,tag) {
            if (tag.indexOf(val) > -1) {
                htmlBuf.push('<li>' + ('<span>' + tag + '</span>') + '</li>');
            }
        })
        //if (htmlBuf.length) {
            $("#tagList").html(htmlBuf.join('')).show();
        //}
    }

	function initEvents() {
		$("#btnSubmit").on('click', submitPost);
        $('#txtTag').on('keyup', showTagListTip);
	}

	$(function() {
		new Editor("txtContent", "divToolbar", {
			preview: "divPreview"
		});
		initEvents();
	});

})(jQuery, WMD, window);

