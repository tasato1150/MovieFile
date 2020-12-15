$(document).on('turbolinks:load',()=>{
  const  buildFileField = (index)=> {
   const html =`<div data-index="${index}" class="ImageFile_group">
                <input class="ImageFile" type="file"
                name="tweet[images_attributes][${index}][src]"
                id="tweet_images_attributes_${index}_src"
                accept: 'image/jpg,image/jpeg,image/png,image/gif'
                data-index="${index}"><br>
              </div>`;
    return html;
  }
  const buildImg = (num, url)=> {
    const html = `<div class="show-image" id="image_box_${num}">
                    <img data-index="${num}" src="${url}" class="image-file" width="100px" height="100px">
                      <div class="content">
                        <div id="delete_btn_${num}" class="delete-btn" data-index="${num}" >削除</div>
                      </div>
                  </div>`;
    return html;
  }
  var count = $('.image-file').length;
  if (count == 5){
    $('.ImageSide__form__icon').toggle(false);
    }
  let fileIndex = [1,2,3,4,5,6,7,8,9,10];
  lastIndex = $('.ImageFile_group:last').data('index');
  fileIndex.splice(0, lastIndex);
  $('.hidden').hide();
    //クリックしたらファイルフィールドが選択される
  $('.ImageSide__form__icon').on('click', function(e){
    // インプットボックスの最後のカスタムデータID取得
    const file_field = $('input[type="file"]:last');
    //クリックによって最後のフォームが選択される
    file_field.trigger('click');
  });

  
  $('.ImageSide__PhotoNumber').on('change','.ImageFile',function(e){
    const targetIndex = $(this).data('index');
    const file = e.target.files[0];
    const blobUrl = window.URL.createObjectURL(file);
    if (img = $(`img[data-index="${targetIndex}"]`)[0]) {
      img.setAttribute('src',blobUrl);
    } else{
    $('#previews').append(buildImg(targetIndex, blobUrl));
    const next_index = $('input[type="file"]:last').data('index') +1;
    $('.ImageSide__PhotoNumber').append(buildFileField(next_index));
    fileIndex.shift();
    fileIndex.push(fileIndex[fileIndex.length -1] + 1);
    var count = $('.image-file').length;
    if (count == 5){
      $('.ImageSide__form__icon').toggle(false);
      }
    }
  });


  $('#previews').on('click', '.delete-btn', function(e){
    //画像の削除
    const image = $(this).parent().parent();
    image.remove();
    //データインデックスの取得
    const data_index = $(this).data('index');
    // データインデックスのカスタムデータ属性をfile_fieldに定義
    const file_field = $(`input[type="file"][data-index="${data_index}"]`);
    file_field.remove();
    var count = $('.image-file').length;
    // 画像が4以下になった時に5枚投稿された時発動した.toggle(else)を解除
    if (count == 4){
      $('.ImageSide__form__icon').toggle(true);
    } 
  });

  
  $('#previews').on('click','.eidt-btn',function(){
    const data_index = $(this).data('index');
    // データインデックスのカスタムデータ属性をfile_fieldに定義
    const file_field = $(`input[type="file"][data-index="${data_index}"]`);
    file_field.trigger('click');
  });

  $('#image-box').on('change', '.ImageFile', function(e) {
      const targetIndex = $(this).parent().data('index');
      // ファイルのブラウザ上でのURLを取得する
      const file = e.target.files[0];
      const blobUrl = window.URL.createObjectURL(file);
      // 該当indexを持つimgタグがあれば取得して変数imgに入れる(画像変更の処理)
      if (img = $(`img[data-index="${targetIndex}"]`)[0]) {
      img.setAttribute('src', blobUrl);
    } else {  // 新規画像追加の処理
      $('#preview').append(buildImg(targetIndex, blobUrl));
      // fileIndexの先頭の数字を使ってinputを作る
      $('#image-box').append(buildFileField(fileIndex[0]));
      fileIndex.shift();
      // 末尾の数に1足した数を追加する
      fileIndex.push(fileIndex[fileIndex.length - 1] + 1)
    }
  });

    // 投稿された画像を削除
  $('#previews').on('click', '.js-remove', function() {
    const image = $(this).parent().parent();
    image.remove();
    const data_index = $(this).data('index');
    const hiddenCheck = $(`input[data-index="${data_index}"].hidden`);
    if (hiddenCheck) hiddenCheck.prop('checked', true);
    $(`img[data-index="${data_index}"]`).remove();
    if ($('.ImageFile').length == 0) $('#image-box').append(buildFileField(fileIndex[0]));
    var count = $('.image-file').length;
    if (count == 4){
    $('.ImageSide__form__icon').toggle(true);
    } 
  });
});