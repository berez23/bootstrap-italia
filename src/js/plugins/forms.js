$(function () {
  const inputSelector =
    'input[type="text"],' +
    'input[type="password"],' +
    'input[type="email"],' +
    'input[type="email"],' +
    'input[type="url"],' +
    'input[type="tel"],' +
    'input[type="number"],' +
    'input[type="search"],' +
    'textarea'

  const inputFileSelector = 'input[type="file"]'

  $(document)
    .on('focus', inputSelector, e => {
      const $this = $(e.target)
      $this.siblings('label, i').addClass('active')
	  const labelsForInput = $this.siblings('label');
		if (labelsForInput && labelsForInput.length > 0){
			if ($(labelsForInput[0]).data('bti')){
				$(labelsForInput[0]).css('width', '');
				$(labelsForInput[0]).css('text-overflow', '');
				$(labelsForInput[0]).css('white-space', '');
				$(labelsForInput[0]).css('overflow', '');
			}
		}
    })
    .on('blur', inputSelector, e => {
      const $this = $(e.target)
      const noValue = !$this.val()
      const noPlaceholder = !$this.attr('placeholder')

      if (noValue && noPlaceholder) {
        $this.siblings('label, i').removeClass('active');
		const labelsForInput = $this.siblings('label');
		if (labelsForInput && labelsForInput.length > 0){
			if ($(labelsForInput[0]).data('bti')){
				if (labelsForInput[0].offsetWidth > ($this[0].offsetWidth - 20)){
					console.log('resize');
					$(labelsForInput[0]).css('width', $this[0].offsetWidth);
					$(labelsForInput[0]).css('text-overflow', 'ellipsis');
					$(labelsForInput[0]).css('white-space', 'nowrap');
					$(labelsForInput[0]).css('overflow', 'hidden');
				}
			}
		}
	}
    })
    .on('change', inputSelector, e => {
      const $this = $(e.target)
      updateTextFields($this)
      validateField($this)
    })
    .on('blur', inputFileSelector, e => {
      const $this = $(e.target)
      $this.siblings('label').addClass('active')
    })
    .on('change', inputFileSelector, e => {
      const $this = $(e.target)
      var numFiles = e.currentTarget.files.length
      var nomiFiles = ''
      var multi = ''
      for (i = 0; i < numFiles; i++) {
        fileSize = parseInt(e.currentTarget.files[i].size, 10) / 1024
        filesize = Math.round(fileSize)
        nomiFiles =
          nomiFiles + e.currentTarget.files[i].name + ' (' + filesize + 'kb); '
      }
      if (numFiles > 1) {
        multi = numFiles + ' file da caricare: '
      }
      $this.siblings('.form-file-name').text(multi + nomiFiles)
    })

  const updateTextFields = $input => {
    const $labelAndIcon = $input.siblings('label, i')
    const hasValue = $input.val().length
    const hasPlaceholder = !!$input.attr('placeholder')
    if (hasValue || hasPlaceholder) {
      $labelAndIcon.addClass('active')
    } else {
      $labelAndIcon.removeClass('active')
    }
  }

  const validateField = $input => {
    if ($input.hasClass('validate')) {
      const value = $input.val()
      const noValue = !value.length
      const isValid = !$input[0].validity.badInput
      if (noValue && isValid) {
        $input.removeClass('valid').removeClass('invalid')
      } else {
        const valid = $input.is(':valid')
        const length = Number($input.attr('length')) || 0
        if (valid && (!length || length > value.length)) {
          $input.removeClass('invalid').addClass('valid')
        } else {
          $input.removeClass('valid').addClass('invalid')
        }
      }
    }
  }

  $('body')
    .find(inputSelector)
    .removeClass('valid invalid')
    .each((index, input) => {
      const $this = $(input)
      const hasDefaultValue = !!$this.val()
      const hasPlaceholder = !!$this.attr('placeholder')
      if (hasDefaultValue || hasPlaceholder) {
        $this
          .siblings('label, i')
          .css('transition', 'none')
          .addClass('active');
	  }
	  
	  if (!hasDefaultValue && !hasPlaceholder) {
        $this.siblings('label, i').removeClass('active');
		const labelsForInput = $this.siblings('label');
		if (labelsForInput && labelsForInput.length > 0){
			if ($(labelsForInput[0]).data('bti')){
				console.log(labelsForInput[0].offsetWidth + " " + $this[0].offsetWidth);
				if (labelsForInput[0].offsetWidth > ($this[0].offsetWidth - 20)){
					console.log('resize');
					$(labelsForInput[0]).css('width', $this[0].offsetWidth);
					$(labelsForInput[0]).css('text-overflow', 'ellipsis');
					$(labelsForInput[0]).css('white-space', 'nowrap');
					$(labelsForInput[0]).css('overflow', 'hidden');
				}
			}
		}
	  }
    })
})
