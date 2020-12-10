$(document).on('turbolinks:load', ()=> {
  // 画像用のinputを生成する関数
  const buildFileField = (index)=> {
    const html = `<div data-index="${index}" class="js-file_group">
                    <input class="js-file" type="file"
                    name="tweet[images_attributes][${index}][src]"
                    id="tweet_images_attributes_${index}_src"
                    accept="image/jpg,image/jpeg,image/png,image/gif
                    data-index="${index}">
                  </div>`;
    return html;
  }
  // プレビュー用のimgタグを生成する関数
  const buildImg = (num, url)=> {
    const html = `<div class="Image__show" id="image_box_${num}">
                    <img data-index="${num}" src="${url}" class="image-file" width="100px" height="100px">
                      <div class="content">
                        <div id="js-remove_${num}" class="js-remove" data-index="${num}" >削除</div>
                      </div>
                  </div>`;
    return html;
  }

  var count = $('.image-file').length;
  if (count == 5){
    $('.Image__previews').toggle(false);
    }
  // file_fieldのnameに動的なindexをつける為の配列
  let fileIndex = [1,2,3,4,5,6,7,8,9,10];
  // 既に使われているindexを除外
  lastIndex = $('.js-file_group:last').data('index');
  fileIndex.splice(0, lastIndex);

  $('.hidden').hide();
  $('.Image__previews').on('click', function(e){
    // インプットボックスの最後のカスタムデータID取得
    const file_field = $('input[type="file"]:last');
    //クリックによって最後のフォームが選択される
    file_field.trigger('click');
  });

  $('#image-box').on('change', '.js-file', function(e) {
    const targetIndex = $(this).parent().data('index');
    // ファイルのブラウザ上でのURLを取得する
    const file = e.target.files[0];
    const blobUrl = window.URL.createObjectURL(file);
    // 該当indexを持つimgがあれば取得して変数imgに入れる(画像変更の処理)
    if (img = $(`img[data-index="${targetIndex}"]`)[0]) {
      img.setAttribute('src', blobUrl);
    } else {  // 新規画像追加の処理
      $('#previews').append(buildImg(targetIndex, blobUrl));
      // fileIndexの先頭の数字を使ってinputを作る
      $('#image-box').append(buildFileField(fileIndex[0]));
      fileIndex.shift();
      // 末尾の数に1足した数を追加する
      fileIndex.push(fileIndex[fileIndex.length - 1] + 1);
    }
  });

  $('#image-box').on('click', '.js-remove', function() {
    const targetIndex = $(this).parent().data('index');
    // 該当indexを振られているチェックボックスを取得する
    const hiddenCheck = $(`input[data-index="${targetIndex}"].hidden-destroy`);
    // もしチェックボックスが存在すればチェックを入れる
    if (hiddenCheck) hiddenCheck.prop('checked', true);

    $(this).parent().remove();
    $(`img[data-index="${targetIndex}"]`).remove();

    // 画像入力欄が0個にならないようにしておく
    if ($('.js-file').length == 0) $('#image-box').append(buildFileField(fileIndex[0]));
  });

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
    $('.Image__previews').toggle(true);
    } 
  });
});