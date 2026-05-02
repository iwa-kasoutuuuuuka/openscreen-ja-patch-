import y from "node:fs/promises";
import l from "node:path";
import { fileURLToPath as ne, pathToFileURL as _e } from "node:url";
import { app as x, ipcMain as u, desktopCapturer as Le, systemPreferences as B, shell as Z, dialog as $, screen as R, BrowserWindow as _, nativeImage as $e, session as le, Menu as te, Tray as We } from "electron";
const Ne = { cancel: "Cancel", save: "Save", delete: "Delete", close: "Close", share: "Share", done: "Done", open: "Open", upload: "Upload", export: "Export", showInFolder: "Show in Folder", file: "File", edit: "Edit", view: "View", window: "Window", quit: "Quit", stopRecording: "Stop Recording" }, Be = { play: "Play", pause: "Pause", fullscreen: "Fullscreen", exitFullscreen: "Exit Fullscreen" }, Ue = { name: "English", short: "EN" }, Ke = {
  actions: Ne,
  playback: Be,
  locale: Ue
}, qe = { triggerLabel: "How trimming works", title: "How Trimming Works", description: "Understanding how to cut out unwanted parts of your video.", explanationBefore: "The Trim tool works by defining the segments you want to", remove: "remove", explanationMiddle: " — anything", covered: "covered", explanationAfter: "by a red trim segment will be cut out when you export.", visualExample: "Visual Example", removed: "REMOVED", kept: "Kept", part1: "Part 1", part2: "Part 2", part3: "Part 3", finalVideo: "Final Video", step1Title: "1. Add Trim", step1DescriptionBefore: "Press ", step1DescriptionAfter: " or click the scissors icon to mark a section for removal.", step2Title: "2. Adjust", step2Description: "Drag the edges of the red region to cover exactly what you want to cut out." }, He = { title: "Unsaved Changes", message: "You have unsaved changes.", detail: "Do you want to save your project before closing?", saveAndClose: "Save & Close", discardAndClose: "Discard & Close", loadProject: "Load Project…", saveProject: "Save Project…", saveProjectAs: "Save Project As…" }, Je = { saveGif: "Save Exported GIF", saveVideo: "Save Exported Video", selectVideo: "Select Video File", saveProject: "Save OpenScreen Project", openProject: "Open OpenScreen Project", gifImage: "GIF Image", mp4Video: "MP4 Video", videoFiles: "Video Files", openscreenProject: "OpenScreen Project", allFiles: "All Files" }, Xe = {
  export: { complete: "Export Complete", yourFormatReady: "Your {{format}} is ready", showInFolder: "Show in Folder", finalizingVideo: "Finalizing video export...", compilingGifProgress: "Compiling GIF... {{progress}}%", compilingGifWait: "Compiling GIF... This may take a while", takeMoment: "This may take a moment...", failed: "Export Failed", tryAgain: "Please try again", finalizingVideoTitle: "Finalizing Video", compilingGif: "Compiling GIF", exportingFormat: "Exporting {{format}}", compiling: "Compiling", renderingFrames: "Rendering Frames", processing: "Processing...", finalizing: "Finalizing...", compilingStatus: "Compiling...", status: "Status", format: "Format", frames: "Frames", cancelExport: "Cancel Export", savedSuccessfully: "{{format}} saved successfully!" },
  tutorial: qe,
  unsavedChanges: He,
  fileDialogs: Je
}, Ye = { cancel: "Cancelar", save: "Guardar", delete: "Eliminar", close: "Cerrar", share: "Compartir", done: "Listo", open: "Abrir", upload: "Subir", export: "Exportar", showInFolder: "Mostrar en carpeta", file: "Archivo", edit: "Editar", view: "Vista", window: "Ventana", quit: "Salir", stopRecording: "Detener grabación" }, Ze = { play: "Reproducir", pause: "Pausar", fullscreen: "Pantalla completa", exitFullscreen: "Salir de pantalla completa" }, Qe = { name: "Español", short: "ES" }, et = {
  actions: Ye,
  playback: Ze,
  locale: Qe
}, tt = { triggerLabel: "Cómo funciona el recorte", title: "Cómo funciona el recorte", description: "Aprende a eliminar las partes no deseadas de tu video.", explanationBefore: "La herramienta de recorte funciona definiendo los segmentos que deseas", remove: "eliminar", explanationMiddle: " — cualquier parte", covered: "cubierta", explanationAfter: "por un segmento rojo será eliminada al exportar.", visualExample: "Ejemplo visual", removed: "ELIMINADO", kept: "Conservado", part1: "Parte 1", part2: "Parte 2", part3: "Parte 3", finalVideo: "Video final", step1Title: "1. Agregar recorte", step1DescriptionBefore: "Presiona ", step1DescriptionAfter: " o haz clic en el ícono de tijeras para marcar una sección a eliminar.", step2Title: "2. Ajustar", step2Description: "Arrastra los bordes de la región roja para cubrir exactamente lo que deseas eliminar." }, rt = { title: "Cambios sin guardar", message: "Tienes cambios sin guardar.", detail: "¿Deseas guardar tu proyecto antes de cerrar?", saveAndClose: "Guardar y cerrar", discardAndClose: "Descartar y cerrar", loadProject: "Cargar proyecto…", saveProject: "Guardar proyecto…", saveProjectAs: "Guardar proyecto como…" }, ot = { saveGif: "Guardar GIF exportado", saveVideo: "Guardar video exportado", selectVideo: "Seleccionar archivo de video", saveProject: "Guardar proyecto OpenScreen", openProject: "Abrir proyecto OpenScreen", gifImage: "Imagen GIF", mp4Video: "Video MP4", videoFiles: "Archivos de video", openscreenProject: "Proyecto OpenScreen", allFiles: "Todos los archivos" }, st = {
  export: { complete: "Exportación completada", yourFormatReady: "Tu {{format}} está listo", showInFolder: "Mostrar en carpeta", finalizingVideo: "Finalizando exportación de video...", compilingGifProgress: "Compilando GIF... {{progress}}%", compilingGifWait: "Compilando GIF... Esto puede tardar un rato", takeMoment: "Esto puede tardar un momento...", failed: "La exportación falló", tryAgain: "Por favor intenta de nuevo", finalizingVideoTitle: "Finalizando video", compilingGif: "Compilando GIF", exportingFormat: "Exportando {{format}}", compiling: "Compilando", renderingFrames: "Renderizando cuadros", processing: "Procesando...", finalizing: "Finalizando...", compilingStatus: "Compilando...", status: "Estado", format: "Formato", frames: "Cuadros", cancelExport: "Cancelar exportación", savedSuccessfully: "¡{{format}} guardado exitosamente!" },
  tutorial: tt,
  unsavedChanges: rt,
  fileDialogs: ot
}, nt = { cancel: "Annuler", save: "Enregistrer", delete: "Supprimer", close: "Fermer", share: "Partager", done: "Terminer", open: "Ouvrir", upload: "Téléverser", export: "Exporter", showInFolder: "Afficher dans le dossier", file: "Fichier", edit: "Éditer", view: "Affichage", window: "Fenêtre", quit: "Quitter", stopRecording: "Arrêter l'enregistrement" }, it = { play: "Lecture", pause: "Pause", fullscreen: "Plein écran", exitFullscreen: "Quitter le plein écran" }, at = { name: "Français", short: "FR" }, lt = {
  actions: nt,
  playback: it,
  locale: at
}, ct = { triggerLabel: "Comment fonctionne la coupe", title: "Comment fonctionne la coupe", description: "Comprendre comment supprimer les parties indésirables de votre vidéo.", explanationBefore: "L'outil Coupe fonctionne en définissant les segments que vous souhaitez", remove: "supprimer", explanationMiddle: " — tout ce qui est", covered: "couvert", explanationAfter: "par un segment de coupe rouge sera coupé lors de l'export.", visualExample: "Exemple visuel", removed: "SUPPRIMÉ", kept: "Conservé", part1: "Partie 1", part2: "Partie 2", part3: "Partie 3", finalVideo: "Vidéo finale", step1Title: "1. Ajouter une coupe", step1DescriptionBefore: "Appuyez sur ", step1DescriptionAfter: " ou cliquez sur l'icône ciseaux pour marquer une section à supprimer.", step2Title: "2. Ajuster", step2Description: "Faites glisser les bords de la région rouge pour couvrir exactement ce que vous souhaitez couper." }, dt = { title: "Modifications non enregistrées", message: "Vous avez des modifications non enregistrées.", detail: "Voulez-vous enregistrer votre projet avant de fermer ?", saveAndClose: "Enregistrer et fermer", discardAndClose: "Ignorer et fermer", loadProject: "Charger un projet…", saveProject: "Enregistrer le projet…", saveProjectAs: "Enregistrer le projet sous…" }, ut = { saveGif: "Enregistrer le GIF exporté", saveVideo: "Enregistrer la vidéo exportée", selectVideo: "Sélectionner un fichier vidéo", saveProject: "Enregistrer le projet OpenScreen", openProject: "Ouvrir un projet OpenScreen", gifImage: "Image GIF", mp4Video: "Vidéo MP4", videoFiles: "Fichiers vidéo", openscreenProject: "Projet OpenScreen", allFiles: "Tous les fichiers" }, pt = {
  export: { complete: "Export terminé", yourFormatReady: "Votre {{format}} est prêt", showInFolder: "Afficher dans le dossier", finalizingVideo: "Finalisation de l'export vidéo...", compilingGifProgress: "Compilation du GIF... {{progress}}%", compilingGifWait: "Compilation du GIF... Cela peut prendre un moment", takeMoment: "Cela peut prendre un moment...", failed: "Export échoué", tryAgain: "Veuillez réessayer", finalizingVideoTitle: "Finalisation de la vidéo", compilingGif: "Compilation du GIF", exportingFormat: "Export de {{format}}", compiling: "Compilation en cours", renderingFrames: "Rendu des images", processing: "Traitement en cours...", finalizing: "Finalisation...", compilingStatus: "Compilation...", status: "Statut", format: "Format", frames: "Images", cancelExport: "Annuler l'export", savedSuccessfully: "{{format}} enregistré avec succès !" },
  tutorial: ct,
  unsavedChanges: dt,
  fileDialogs: ut
}, mt = { cancel: "キャンセル", save: "保存", delete: "削除", close: "閉じる", share: "共有", done: "完了", open: "開く", upload: "アップロード", export: "エクスポート", showInFolder: "フォルダに表示", file: "ファイル", edit: "編集", view: "表示", window: "ウィンドウ", quit: "終了", stopRecording: "録画停止" }, ft = { play: "再生", pause: "一時停止", fullscreen: "全画面表示", exitFullscreen: "全画面表示を終了" }, gt = { name: "日本語", short: "JA" }, ht = {
  actions: mt,
  playback: ft,
  locale: gt
}, vt = { triggerLabel: "トリミングの仕組み", title: "トリミングの仕組み", description: "動画の不要な部分を削除する方法について解説します。", explanationBefore: "トリムツールは、動画から", remove: "「削除したい部分」", explanationMiddle: "を指定することで機能します。エクスポート時には、赤い枠で", covered: "囲まれた部分", explanationAfter: "がすべてカットされます。", visualExample: "視覚的な例", removed: "削除", kept: "保持", part1: "パート 1", part2: "パート 2", part3: "パート 3", finalVideo: "完成動画", step1Title: "1. 削除範囲を追加", step1DescriptionBefore: "キーボードの", step1DescriptionAfter: "、またはハサミのアイコンをクリックして、削除したい範囲を指定します。", step2Title: "2. 範囲を調整", step2Description: "赤い領域の両端をドラッグして、削除したい範囲を正確に調整します。" }, yt = { title: "未保存の変更", message: "未保存の変更があります。", detail: "閉じる前にプロジェクトを保存しますか？", saveAndClose: "保存して閉じる", discardAndClose: "破棄して閉じる", loadProject: "プロジェクトを読み込む…", saveProject: "プロジェクトを保存…", saveProjectAs: "プロジェクトを名前を付けて保存…" }, wt = { saveGif: "エクスポートしたGIFを保存", saveVideo: "エクスポートしたビデオを保存", selectVideo: "ビデオファイルを選択", saveProject: "OpenScreen プロジェクトを保存", openProject: "OpenScreen プロジェクトを開く", gifImage: "GIF 画像", mp4Video: "MP4 ビデオ", videoFiles: "ビデオファイル", openscreenProject: "OpenScreen プロジェクト", allFiles: "すべてのファイル" }, Pt = {
  export: { complete: "エクスポート完了", yourFormatReady: "あなたの{{format}}が準備できました", showInFolder: "フォルダで表示", finalizingVideo: "ビデオのエクスポートを最終処理中...", compilingGifProgress: "GIFをコンパイル中... {{progress}}%", compilingGifWait: "GIFをコンパイル中... しばらくお待ちください", takeMoment: "少々お待ちください...", failed: "エクスポートに失敗しました", tryAgain: "もう一度お試しください", finalizingVideoTitle: "ビデオの最終処理", compilingGif: "GIFをコンパイル中", exportingFormat: "{{format}}をエクスポート中", compiling: "コンパイル中", renderingFrames: "フレームをレンダリング中", processing: "処理中...", finalizing: "最終処理中...", compilingStatus: "コンパイル中...", status: "ステータス", format: "フォーマット", frames: "フレーム", cancelExport: "エクスポートをキャンセル", savedSuccessfully: "{{format}}を正常に保存しました！" },
  tutorial: vt,
  unsavedChanges: yt,
  fileDialogs: wt
}, Ft = { cancel: "취소", save: "저장", delete: "삭제", close: "닫기", share: "공유", done: "완료", open: "열기", upload: "업로드", export: "내보내기", showInFolder: "폴더에 표시", file: "파일", edit: "편집", view: "보기", window: "창", quit: "종료", stopRecording: "녹화 중지" }, St = { play: "재생", pause: "일시정지", fullscreen: "전체화면", exitFullscreen: "전체화면 종료" }, bt = { name: "한국어", short: "KO" }, xt = {
  actions: Ft,
  playback: St,
  locale: bt
}, Ct = { triggerLabel: "트리밍 사용법", title: "트리밍 사용법", description: "비디오에서 불필요한 부분을 잘라내는 방법을 알아보세요.", explanationBefore: "트림 도구는 제거할 구간을", remove: "지정", explanationMiddle: "하는 방식으로 동작합니다 —", covered: "빨간 트림 구간으로 덮인", explanationAfter: "부분은 내보낼 때 잘려나갑니다.", visualExample: "화면 예시", removed: "제거됨", kept: "유지됨", part1: "파트 1", part2: "파트 2", part3: "파트 3", finalVideo: "최종 비디오", step1Title: "1. 트림 추가", step1DescriptionBefore: "", step1DescriptionAfter: "키를 누르거나 가위 아이콘을 클릭해 제거할 구간을 표시하세요.", step2Title: "2. 조정", step2Description: "빨간 구간의 가장자리를 드래그해 잘라낼 범위를 설정하세요." }, Dt = { title: "저장되지 않은 변경 사항", message: "저장되지 않은 변경 사항이 있습니다.", detail: "닫기 전에 프로젝트를 저장하시겠습니까?", saveAndClose: "저장 후 닫기", discardAndClose: "저장하지 않고 닫기", loadProject: "프로젝트 불러오기...", saveProject: "프로젝트 저장...", saveProjectAs: "다른 이름으로 프로젝트 저장..." }, At = { saveGif: "내보낸 GIF 저장", saveVideo: "내보낸 비디오 저장", selectVideo: "비디오 파일 선택", saveProject: "OpenScreen 프로젝트 저장", openProject: "OpenScreen 프로젝트 열기", gifImage: "GIF 이미지", mp4Video: "MP4 비디오", videoFiles: "비디오 파일", openscreenProject: "OpenScreen 프로젝트", allFiles: "모든 파일" }, It = {
  export: { complete: "내보내기 완료", yourFormatReady: "{{format}} 파일이 준비되었습니다", showInFolder: "폴더에서 보기", finalizingVideo: "비디오 내보내기 마무리 중...", compilingGifProgress: "GIF 생성 중... {{progress}}%", compilingGifWait: "GIF 생성 중... 잠시 시간이 걸릴 수 있습니다", takeMoment: "잠시 기다려 주세요...", failed: "내보내기 실패", tryAgain: "다시 시도해 주세요", finalizingVideoTitle: "비디오 마무리 중", compilingGif: "GIF 생성 중", exportingFormat: "{{format}} 내보내는 중", compiling: "생성 중...", renderingFrames: "프레임 렌더링 중", processing: "처리 중...", finalizing: "마무리 중...", compilingStatus: "생성 중...", status: "상태", format: "형식", frames: "프레임", cancelExport: "내보내기 취소", savedSuccessfully: "{{format}} 저장이 완료되었습니다!" },
  tutorial: Ct,
  unsavedChanges: Dt,
  fileDialogs: At
}, jt = { cancel: "İptal", save: "Kaydet", delete: "Sil", close: "Kapat", share: "Paylaş", done: "Tamam", open: "Aç", upload: "Yükle", export: "Dışa Aktar", showInFolder: "Klasörde Göster", file: "Dosya", edit: "Düzenle", view: "Görünüm", window: "Pencere", quit: "Çıkış", stopRecording: "Kaydı Durdur" }, Vt = { play: "Oynat", pause: "Duraklat", fullscreen: "Tam Ekran", exitFullscreen: "Tam Ekrandan Çık" }, Et = { name: "Türkçe", short: "TR" }, Tt = {
  actions: jt,
  playback: Vt,
  locale: Et
}, kt = { triggerLabel: "Kırpma nasıl çalışır", title: "Kırpma Nasıl Çalışır", description: "Videonuzun istenmeyen bölümlerini nasıl keseceğinizi anlayın.", explanationBefore: "Kırpma aracı, istediğiniz bölümleri", remove: "kaldırmak", explanationMiddle: " için kullanılır; kırmızı kırpma bölgesiyle", covered: "kaplanan", explanationAfter: "her şey dışa aktarımda kesilecektir.", visualExample: "Görsel Örnek", removed: "KALDIRILDI", kept: "Korundu", part1: "Bölüm 1", part2: "Bölüm 2", part3: "Bölüm 3", finalVideo: "Son Video", step1Title: "1. Kırpma Ekle", step1DescriptionBefore: "Kaldırılacak bölümü işaretlemek için ", step1DescriptionAfter: " tuşuna basın veya makas simgesine tıklayın.", step2Title: "2. Ayarla", step2Description: "Kesmek istediğiniz kısmı tam olarak kaplamak için kırmızı bölgenin kenarlarını sürükleyin." }, Ot = { title: "Kaydedilmemiş Değişiklikler", message: "Kaydedilmemiş değişiklikleriniz var.", detail: "Kapatmadan önce projenizi kaydetmek ister misiniz?", saveAndClose: "Kaydet ve Kapat", discardAndClose: "Kaydetmeden Kapat", loadProject: "Proje Yükle…", saveProject: "Proje Kaydet…", saveProjectAs: "Farklı Kaydet…" }, Rt = { saveGif: "Dışa Aktarılan GIF'i Kaydet", saveVideo: "Dışa Aktarılan Videoyu Kaydet", selectVideo: "Video Dosyası Seç", saveProject: "OpenScreen Projesini Kaydet", openProject: "OpenScreen Projesini Aç", gifImage: "GIF Görüntüsü", mp4Video: "MP4 Video", videoFiles: "Video Dosyaları", openscreenProject: "OpenScreen Projesi", allFiles: "Tüm Dosyalar" }, Mt = {
  export: { complete: "Dışa Aktarım Tamamlandı", yourFormatReady: "{{format}} dosyanız hazır", showInFolder: "Klasörde Göster", finalizingVideo: "Video dışa aktarımı sonlandırılıyor...", compilingGifProgress: "GIF derleniyor... %{{progress}}", compilingGifWait: "GIF derleniyor... Bu biraz zaman alabilir", takeMoment: "Bu biraz zaman alabilir...", failed: "Dışa Aktarım Başarısız", tryAgain: "Lütfen tekrar deneyin", finalizingVideoTitle: "Video Sonlandırılıyor", compilingGif: "GIF Derleniyor", exportingFormat: "{{format}} Dışa Aktarılıyor", compiling: "Derleniyor", renderingFrames: "Kareler İşleniyor", processing: "İşleniyor...", finalizing: "Sonlandırılıyor...", compilingStatus: "Derleniyor...", status: "Durum", format: "Biçim", frames: "Kareler", cancelExport: "Dışa Aktarımı İptal Et", savedSuccessfully: "{{format}} başarıyla kaydedildi!" },
  tutorial: kt,
  unsavedChanges: Ot,
  fileDialogs: Rt
}, Gt = { cancel: "取消", save: "保存", delete: "删除", close: "关闭", share: "分享", done: "完成", open: "打开", upload: "上传", export: "导出", showInFolder: "在文件夹中显示", file: "文件", edit: "编辑", view: "视图", window: "窗口", quit: "退出", stopRecording: "停止录制" }, zt = { play: "播放", pause: "暂停", fullscreen: "全屏", exitFullscreen: "退出全屏" }, _t = { name: "简体中文", short: "简中" }, Lt = {
  actions: Gt,
  playback: zt,
  locale: _t
}, $t = { triggerLabel: "剪辑功能说明", title: "剪辑功能说明", description: "了解如何剪掉视频中不需要的部分。", explanationBefore: "剪辑工具通过定义您要", remove: "移除", explanationMiddle: "——任何被", covered: "覆盖", explanationAfter: "的红色剪辑区域部分将在导出时被剪掉。", visualExample: "示例演示", removed: "已移除", kept: "保留", part1: "第 1 部分", part2: "第 2 部分", part3: "第 3 部分", finalVideo: "最终视频", step1Title: "1. 添加剪辑", step1DescriptionBefore: "按", step1DescriptionAfter: "键或点击剪刀图标来标记要移除的片段。", step2Title: "2. 调整", step2Description: "拖动红色区域的边缘，精确覆盖您要剪掉的部分。" }, Wt = { title: "未保存的更改", message: "您有未保存的更改。", detail: "是否在关闭前保存项目？", saveAndClose: "保存并关闭", discardAndClose: "放弃并关闭", loadProject: "加载项目…", saveProject: "保存项目…", saveProjectAs: "项目另存为…" }, Nt = { saveGif: "保存导出的 GIF", saveVideo: "保存导出的视频", selectVideo: "选择视频文件", saveProject: "保存 OpenScreen 项目", openProject: "打开 OpenScreen 项目", gifImage: "GIF 图片", mp4Video: "MP4 视频", videoFiles: "视频文件", openscreenProject: "OpenScreen 项目", allFiles: "所有文件" }, Bt = {
  export: { complete: "导出完成", yourFormatReady: "您的 {{format}} 已准备就绪", showInFolder: "在文件夹中显示", finalizingVideo: "正在完成视频导出...", compilingGifProgress: "正在编译 GIF... {{progress}}%", compilingGifWait: "正在编译 GIF... 这可能需要一些时间", takeMoment: "这可能需要一点时间...", failed: "导出失败", tryAgain: "请重试", finalizingVideoTitle: "正在完成视频", compilingGif: "正在编译 GIF", exportingFormat: "正在导出 {{format}}", compiling: "编译中", renderingFrames: "渲染帧", processing: "处理中...", finalizing: "正在完成...", compilingStatus: "编译中...", status: "状态", format: "格式", frames: "帧", cancelExport: "取消导出", savedSuccessfully: "{{format}} 保存成功！" },
  tutorial: $t,
  unsavedChanges: Wt,
  fileDialogs: Nt
}, Ut = { cancel: "取消", save: "儲存", delete: "刪除", close: "關閉", share: "分享", done: "完成", open: "開啟", upload: "上傳", export: "匯出", showInFolder: "在資料夾中顯示", file: "檔案", edit: "編輯", view: "檢視", window: "視窗", quit: "退出", stopRecording: "停止錄製" }, Kt = { play: "播放", pause: "暫停", fullscreen: "全螢幕", exitFullscreen: "退出全螢幕" }, qt = { name: "繁體中文", short: "繁中" }, Ht = {
  actions: Ut,
  playback: Kt,
  locale: qt
}, Jt = { triggerLabel: "剪輯功能說明", title: "剪輯功能說明", description: "了解如何剪掉影片中不需要的部分。", explanationBefore: "剪輯工具透過定義您要", remove: "移除", explanationMiddle: "——任何被", covered: "覆蓋", explanationAfter: "的紅色剪輯區域部分將在匯出時被剪掉。", visualExample: "示例演示", removed: "已移除", kept: "保留", part1: "第 1 部分", part2: "第 2 部分", part3: "第 3 部分", finalVideo: "最終影片", step1Title: "1. 添加剪輯", step1DescriptionBefore: "按", step1DescriptionAfter: "鍵或點擊剪刀圖示來標記要移除的片段。", step2Title: "2. 調整", step2Description: "拖動紅色區域的邊緣，精確覆蓋您要剪掉的部分。" }, Xt = { title: "未儲存的變更", message: "您有未儲存的變更。", detail: "是否在關閉前儲存專案？", saveAndClose: "儲存並關閉", discardAndClose: "捨棄並關閉", loadProject: "載入專案…", saveProject: "儲存專案…", saveProjectAs: "專案另存新檔…" }, Yt = { saveGif: "儲存匯出的 GIF", saveVideo: "儲存匯出的影片", selectVideo: "選擇影片檔案", saveProject: "儲存 OpenScreen 專案", openProject: "開啟 OpenScreen 專案", gifImage: "GIF 圖片", mp4Video: "MP4 影片", videoFiles: "影片檔案", openscreenProject: "OpenScreen 專案", allFiles: "所有檔案" }, Zt = {
  export: { complete: "匯出完成", yourFormatReady: "您的 {{format}} 已準備就緒", showInFolder: "在資料夾中顯示", finalizingVideo: "正在完成影片匯出...", compilingGifProgress: "正在編譯 GIF... {{progress}}%", compilingGifWait: "正在編譯 GIF... 這可能需要一些時間", takeMoment: "這可能需要一點時間...", failed: "匯出失敗", tryAgain: "請重試", finalizingVideoTitle: "正在完成影片", compilingGif: "正在編譯 GIF", exportingFormat: "正在匯出 {{format}}", compiling: "編譯中", renderingFrames: "渲染影格", processing: "處理中...", finalizing: "正在完成...", compilingStatus: "編譯中...", status: "狀態", format: "格式", frames: "影格", cancelExport: "取消匯出", savedSuccessfully: "{{format}} 儲存成功！" },
  tutorial: Jt,
  unsavedChanges: Xt,
  fileDialogs: Yt
}, ce = {
  en: { common: Ke, dialogs: Xe },
  "zh-CN": { common: Lt, dialogs: Bt },
  "zh-TW": { common: Ht, dialogs: Zt },
  es: { common: et, dialogs: st },
  fr: { common: lt, dialogs: pt },
  "ja-JP": { common: ht, dialogs: Pt },
  "ko-KR": { common: xt, dialogs: It },
  tr: { common: Tt, dialogs: Mt }
};
let Se = "en";
function Qt(e) {
  (e === "en" || e === "zh-CN" || e === "zh-TW" || e === "es" || e === "fr" || e === "ja-JP" || e === "ko-KR" || e === "tr") && (Se = e);
}
function de(e, t) {
  const r = t.split(".");
  let i = e;
  for (const d of r) {
    if (i == null || typeof i != "object") return;
    i = i[d];
  }
  return typeof i == "string" ? i : void 0;
}
function er(e, t) {
  return e;
}
function m(e, t, r) {
  const i = de(ce[Se]?.[e], t) ?? de(ce.en?.[e], t);
  return i == null ? `${e}.${t}` : er(i);
}
const tr = 8, rr = 1e4;
function ue(e, t) {
  if (typeof e != "number" || !Number.isFinite(e)) return t;
  const r = Math.floor(e);
  return r >= 1 ? r : t;
}
function or(e) {
  const t = ue(e.maxActiveSamples, rr), r = ue(e.maxPendingBatches, tr);
  let i = [], d = null, p = [];
  return {
    startSession(c) {
      i = [], d = c;
    },
    push(c) {
      i.push(c), i.length > t && i.shift();
    },
    endSession() {
      let c = 0;
      if (i.length > 0 && d !== null)
        for (p.push({ recordingId: d, samples: i }); p.length > r; )
          p.shift(), c++;
      return i = [], d = null, c > 0 && console.warn(
        `[cursorTelemetryBuffer] dropped ${c} pending batch(es) to stay within maxPendingBatches=${r}`
      ), c;
    },
    takeNextBatch() {
      return p.shift() ?? null;
    },
    prependBatch(c) {
      if (c.samples.length === 0) return;
      p.unshift(c);
      let w = 0;
      for (; p.length > r; )
        p.pop(), w++;
      w > 0 && console.warn(
        `[cursorTelemetryBuffer] prependBatch trimmed ${w} trailing batch(es) to stay within maxPendingBatches=${r}`
      );
    },
    discardBatch(c) {
      const w = p.findIndex((P) => P.recordingId === c);
      return w === -1 ? !1 : (p.splice(w, 1), !0);
    },
    reset() {
      i = [], d = null, p = [];
    },
    get activeCount() {
      return i.length;
    },
    get pendingCount() {
      return p.length;
    }
  };
}
function pe(e) {
  if (typeof e != "string")
    return;
  const t = e.trim();
  return t || void 0;
}
function be(e) {
  if (!e || typeof e != "object")
    return null;
  const t = e, r = pe(t.screenVideoPath);
  if (!r)
    return null;
  const i = pe(t.webcamVideoPath);
  return i ? { screenVideoPath: r, webcamVideoPath: i } : {
    screenVideoPath: r
  };
}
function xe(e) {
  if (!e || typeof e != "object")
    return null;
  const t = e, r = be(t);
  return r ? {
    ...r,
    createdAt: typeof t.createdAt == "number" && Number.isFinite(t.createdAt) ? t.createdAt : Date.now()
  } : null;
}
const K = "openscreen", me = l.join(x.getPath("userData"), "shortcuts.json"), Ce = ".session.json", sr = /* @__PURE__ */ new Set([".webm", ".mp4", ".mov", ".avi", ".mkv"]), De = /* @__PURE__ */ new Set();
function re(e) {
  De.add(l.resolve(e));
}
function nr() {
  return [S];
}
function Ae(e, t) {
  const r = l.resolve(e), i = l.resolve(t);
  return r === i || r.startsWith(i + l.sep);
}
function q(e) {
  const t = l.resolve(e);
  return De.has(t) ? !0 : nr().some((r) => Ae(t, r));
}
function ir(e) {
  return sr.has(l.extname(e).toLowerCase());
}
async function oe(e, t) {
  const r = V(e);
  if (!r)
    return null;
  if (q(r))
    return r;
  if (!ir(r))
    return null;
  if (t) {
    const i = l.resolve(r);
    if (!t.some((p) => Ae(i, p)))
      return null;
  }
  try {
    if (!(await y.stat(r)).isFile())
      return null;
  } catch {
    return null;
  }
  return re(r), r;
}
function fe(e) {
  const t = e.trim();
  if (!t)
    throw new Error("Invalid recording file name");
  const r = l.parse(t), i = t.split(/[\\/]+/).some((p) => p === ".."), d = r.dir !== "" || l.isAbsolute(t) || t.includes("/") || t.includes("\\");
  if (i || d || r.base !== t)
    throw new Error("Recording file name must not contain path segments");
  return l.join(S, r.base);
}
async function ge(e, t) {
  if (!e || typeof e != "object")
    return null;
  const r = e, i = be(r.media) ?? (typeof r.videoPath == "string" ? {
    screenVideoPath: V(r.videoPath) ?? r.videoPath
  } : null);
  if (!i)
    return null;
  const d = [S];
  t && d.push(l.dirname(l.resolve(t)));
  const p = await oe(i.screenVideoPath, d);
  if (!p)
    throw new Error("Project references an invalid or unsupported screen video path");
  const c = i.webcamVideoPath ? await oe(i.webcamVideoPath, d) : void 0;
  if (i.webcamVideoPath && !c)
    throw new Error("Project references an invalid or unsupported webcam video path");
  return c ? { screenVideoPath: p, webcamVideoPath: c, createdAt: Date.now() } : { screenVideoPath: p, createdAt: Date.now() };
}
let W = null, F = null, D = null;
function U(e) {
  return l.resolve(e);
}
function V(e) {
  if (typeof e != "string")
    return null;
  const t = e.trim();
  if (!t)
    return null;
  if (/^file:\/\//i.test(t))
    try {
      return ne(t);
    } catch {
    }
  return t;
}
function ar(e) {
  return !e || !F ? !1 : U(e) === U(F);
}
function A(e) {
  D = e;
}
function lr(e) {
  const t = l.parse(e), r = t.name.endsWith("-webcam") ? t.name.slice(0, -7) : t.name;
  return l.join(t.dir, `${r}${Ce}`);
}
async function cr(e) {
  const t = V(e);
  if (!t)
    return null;
  try {
    const r = lr(t), i = await y.readFile(r, "utf-8"), d = xe(JSON.parse(i));
    if (!d)
      return null;
    const p = {
      ...d,
      screenVideoPath: V(d.screenVideoPath) ?? d.screenVideoPath,
      ...d.webcamVideoPath ? {
        webcamVideoPath: V(d.webcamVideoPath) ?? d.webcamVideoPath
      } : {}
    }, c = U(t), w = U(p.screenVideoPath) === c, P = p.webcamVideoPath ? U(p.webcamVideoPath) === c : !1;
    return w || P ? p : null;
  } catch {
    return null;
  }
}
async function he(e) {
  const t = typeof e.createdAt == "number" && Number.isFinite(e.createdAt) ? e.createdAt : Date.now(), r = fe(e.screen.fileName);
  await y.writeFile(r, Buffer.from(e.screen.videoData));
  let i;
  e.webcam && (i = fe(e.webcam.fileName), await y.writeFile(i, Buffer.from(e.webcam.videoData)));
  const d = i ? { screenVideoPath: r, webcamVideoPath: i, createdAt: t } : { screenVideoPath: r, createdAt: t };
  A(d), F = null;
  const p = `${r}.cursor.json`, c = M.takeNextBatch();
  if (c && c.samples.length > 0)
    try {
      await y.writeFile(
        p,
        JSON.stringify(
          { version: dr, samples: c.samples },
          null,
          2
        ),
        "utf-8"
      );
    } catch (P) {
      throw M.prependBatch(c), P;
    }
  const w = l.join(
    S,
    `${l.parse(e.screen.fileName).name}${Ce}`
  );
  return await y.writeFile(w, JSON.stringify(d, null, 2), "utf-8"), {
    success: !0,
    path: r,
    session: d,
    message: "Recording session stored successfully"
  };
}
const dr = 1, ur = 100, pr = 3600 * 10;
let H = null, Ie = 0;
const M = or({
  maxActiveSamples: pr
});
function J(e, t, r) {
  return Math.min(r, Math.max(t, e));
}
function ve() {
  H && (clearInterval(H), H = null);
}
function ye() {
  const e = R.getCursorScreenPoint(), t = Number(W?.display_id), d = ((Number.isFinite(t) ? R.getAllDisplays().find((f) => f.id === t) ?? null : null) ?? R.getDisplayNearestPoint(e)).bounds, p = Math.max(1, d.width), c = Math.max(1, d.height), w = J((e.x - d.x) / p, 0, 1), P = J((e.y - d.y) / c, 0, 1);
  M.push({
    timeMs: Math.max(0, Date.now() - Ie),
    cx: w,
    cy: P
  });
}
function mr(e, t, r, i, d, p, c, w) {
  const P = process.platform !== "linux", f = {
    visible: !1,
    value: null,
    activeRunId: null,
    hideCommitId: 0,
    hideCommitTimer: null
  }, Ge = 1200, ie = () => {
    f.hideCommitTimer && (clearTimeout(f.hideCommitTimer), f.hideCommitTimer = null);
  }, ze = (o, a) => {
    o.isDestroyed() || f.visible || f.hideCommitId !== a || (o.hide(), P && o.setOpacity(1));
  }, ae = (o) => {
    if (!o.isDestroyed() && (ie(), o.webContents.send("countdown-overlay-value", f.value), !!f.visible)) {
      if (o.isVisible()) {
        P && o.setOpacity(1);
        return;
      }
      setTimeout(() => {
        !o.isDestroyed() && f.visible && !o.isVisible() && (P && o.setOpacity(0), o.showInactive(), P && setTimeout(() => {
          !o.isDestroyed() && f.visible && o.isVisible() && o.setOpacity(1);
        }, 0));
      }, 16);
    }
  };
  u.handle("countdown-overlay-show", (o, a, n) => {
    f.activeRunId = n, f.visible = !0, f.value = a;
    const s = p() ?? r();
    s.isDestroyed() || (s.webContents.isLoading() ? s.webContents.once("did-finish-load", () => {
      s.isDestroyed() || ae(s);
    }) : ae(s));
  }), u.handle("countdown-overlay-set-value", (o, a, n) => {
    if (f.activeRunId !== n || !f.visible)
      return;
    f.value = a;
    const s = p();
    !s || s.isDestroyed() || s.webContents.isLoading() || s.webContents.send("countdown-overlay-value", a);
  }), u.handle("countdown-overlay-hide", (o, a) => {
    if (f.activeRunId !== a)
      return;
    f.visible = !1, f.hideCommitId += 1;
    const n = f.hideCommitId;
    ie();
    const s = p();
    if (!s || s.isDestroyed()) {
      f.value = null;
      return;
    }
    if (P && s.setOpacity(0), f.value = null, s.webContents.isLoading() || s.webContents.send("countdown-overlay-value", f.value), !P) {
      s.hide();
      return;
    }
    f.hideCommitTimer = setTimeout(() => {
      f.hideCommitTimer = null, ze(s, n);
    }, Ge);
  }), u.handle("switch-to-hud", () => {
    w && w();
  }), u.handle("start-new-recording", () => {
    try {
      return A(null), w && w(), { success: !0 };
    } catch (o) {
      return console.error("Failed to start new recording:", o), { success: !1, error: String(o) };
    }
  }), u.handle("get-sources", async (o, a) => (await Le.getSources(a)).map((s) => ({
    id: s.id,
    name: s.name,
    display_id: s.display_id,
    thumbnail: s.thumbnail ? s.thumbnail.toDataURL() : null,
    appIcon: s.appIcon ? s.appIcon.toDataURL() : null
  }))), u.handle("select-source", (o, a) => {
    W = a;
    const n = d();
    return n && n.close(), W;
  }), u.handle("get-selected-source", () => W), u.handle("request-camera-access", async () => {
    if (process.platform !== "darwin")
      return { success: !0, granted: !0, status: "granted" };
    try {
      const o = B.getMediaAccessStatus("camera");
      if (o === "granted")
        return { success: !0, granted: !0, status: o };
      if (o === "not-determined") {
        const a = await B.askForMediaAccess("camera");
        return {
          success: !0,
          granted: a,
          status: a ? "granted" : B.getMediaAccessStatus("camera")
        };
      }
      return { success: !0, granted: !1, status: o };
    } catch (o) {
      return console.error("Failed to request camera access:", o), {
        success: !1,
        granted: !1,
        status: "unknown",
        error: String(o)
      };
    }
  }), u.handle("open-source-selector", () => {
    const o = d();
    if (o) {
      o.focus();
      return;
    }
    t();
  }), u.handle("switch-to-editor", () => {
    const o = i();
    o && o.close(), e();
  }), u.handle("store-recorded-session", async (o, a) => {
    try {
      return await he(a);
    } catch (n) {
      return console.error("Failed to store recording session:", n), {
        success: !1,
        message: "Failed to store recording session",
        error: String(n)
      };
    }
  }), u.handle("store-recorded-video", async (o, a, n) => {
    try {
      return await he({
        screen: { videoData: a, fileName: n },
        createdAt: Date.now()
      });
    } catch (s) {
      return console.error("Failed to store recorded video:", s), {
        success: !1,
        message: "Failed to store recorded video",
        error: String(s)
      };
    }
  }), u.handle("get-recorded-video-path", async () => {
    try {
      if (D?.screenVideoPath)
        return { success: !0, path: D.screenVideoPath };
      const a = (await y.readdir(S)).filter(
        (v) => v.endsWith(".webm") && !v.endsWith("-webcam.webm")
      );
      if (a.length === 0)
        return { success: !1, message: "No recorded video found" };
      let n = null, s = 0;
      for (const v of a)
        try {
          const C = await y.stat(l.join(S, v));
          C.mtimeMs > s && (s = C.mtimeMs, n = v);
        } catch {
        }
      return n ? { success: !0, path: l.join(S, n) } : { success: !1, message: "No recorded video found" };
    } catch (o) {
      return console.error("Failed to get video path:", o), { success: !1, message: "Failed to get video path", error: String(o) };
    }
  }), u.handle("read-binary-file", async (o, a) => {
    try {
      const n = V(a);
      if (!n)
        return { success: !1, message: "Invalid file path" };
      if (!q(n))
        return console.warn(
          "[read-binary-file] Rejected path outside allowed directories:",
          n
        ), { success: !1, message: "Access denied: path outside allowed directories" };
      const s = await y.readFile(n);
      return {
        success: !0,
        data: s.buffer.slice(s.byteOffset, s.byteOffset + s.byteLength),
        path: n
      };
    } catch (n) {
      return console.error("Failed to read binary file:", n), {
        success: !1,
        message: "Failed to read binary file",
        error: String(n)
      };
    }
  }), u.handle("set-recording-state", (o, a, n) => {
    if (a) {
      ve();
      const h = typeof n == "number" ? n : Date.now();
      M.startSession(h), Ie = Date.now(), ye(), H = setInterval(ye, ur);
    } else
      ve(), M.endSession();
    c && c(a, (W || { name: "Screen" }).name);
  }), u.handle("discard-cursor-telemetry", (o, a) => {
    M.discardBatch(a);
  }), u.handle("get-cursor-telemetry", async (o, a) => {
    const n = V(
      a ?? D?.screenVideoPath
    );
    if (!n)
      return { success: !0, samples: [] };
    if (!q(n))
      return console.warn(
        "[get-cursor-telemetry] Rejected path outside allowed directories:",
        n
      ), { success: !0, samples: [] };
    const s = `${n}.cursor.json`;
    try {
      const h = await y.readFile(s, "utf-8"), v = JSON.parse(h);
      return { success: !0, samples: (Array.isArray(v) ? v : Array.isArray(v?.samples) ? v.samples : []).filter((O) => !!(O && typeof O == "object")).map((O) => {
        const b = O;
        return {
          timeMs: typeof b.timeMs == "number" && Number.isFinite(b.timeMs) ? Math.max(0, b.timeMs) : 0,
          cx: typeof b.cx == "number" && Number.isFinite(b.cx) ? J(b.cx, 0, 1) : 0.5,
          cy: typeof b.cy == "number" && Number.isFinite(b.cy) ? J(b.cy, 0, 1) : 0.5
        };
      }).sort((O, b) => O.timeMs - b.timeMs) };
    } catch (h) {
      return h.code === "ENOENT" ? { success: !0, samples: [] } : (console.error("Failed to load cursor telemetry:", h), {
        success: !1,
        message: "Failed to load cursor telemetry",
        error: String(h),
        samples: []
      });
    }
  }), u.handle("open-external-url", async (o, a) => {
    try {
      const n = ["http:", "https:", "mailto:"];
      let s;
      try {
        s = new URL(a);
      } catch {
        return { success: !1, error: "Invalid URL" };
      }
      return n.includes(s.protocol) ? (await Z.openExternal(s.toString()), { success: !0 }) : { success: !1, error: `Unsupported URL scheme: ${s.protocol}` };
    } catch (n) {
      return console.error("Failed to open URL:", n), { success: !1, error: String(n) };
    }
  }), u.handle("save-exported-video", async (o, a, n) => {
    try {
      const s = n.toLowerCase().endsWith(".gif"), h = s ? [{ name: m("dialogs", "fileDialogs.gifImage"), extensions: ["gif"] }] : [{ name: m("dialogs", "fileDialogs.mp4Video"), extensions: ["mp4"] }], v = await $.showSaveDialog({
        title: s ? m("dialogs", "fileDialogs.saveGif") : m("dialogs", "fileDialogs.saveVideo"),
        defaultPath: l.join(x.getPath("downloads"), n),
        filters: h,
        properties: ["createDirectory", "showOverwriteConfirmation"]
      });
      if (v.canceled || !v.filePath)
        return {
          success: !1,
          canceled: !0,
          message: "Export canceled"
        };
      const C = l.normalize(v.filePath);
      return await y.mkdir(l.dirname(C), { recursive: !0 }), await y.writeFile(C, Buffer.from(a)), {
        success: !0,
        path: C,
        message: "Video exported successfully"
      };
    } catch (s) {
      return console.error("Failed to save exported video:", s), {
        success: !1,
        message: "Failed to save exported video",
        error: String(s)
      };
    }
  }), u.handle("open-video-file-picker", async () => {
    try {
      const o = await $.showOpenDialog({
        title: m("dialogs", "fileDialogs.selectVideo"),
        defaultPath: S,
        filters: [
          {
            name: m("dialogs", "fileDialogs.videoFiles"),
            extensions: ["webm", "mp4", "mov", "avi", "mkv"]
          },
          { name: m("dialogs", "fileDialogs.allFiles"), extensions: ["*"] }
        ],
        properties: ["openFile"]
      });
      if (o.canceled || o.filePaths.length === 0)
        return { success: !1, canceled: !0 };
      const a = await oe(o.filePaths[0]);
      return a ? (F = null, {
        success: !0,
        path: a
      }) : {
        success: !1,
        message: "Selected file is not a supported video"
      };
    } catch (o) {
      return console.error("Failed to open file picker:", o), {
        success: !1,
        message: "Failed to open file picker",
        error: String(o)
      };
    }
  }), u.handle("reveal-in-folder", async (o, a) => {
    try {
      return Z.showItemInFolder(a), { success: !0 };
    } catch (n) {
      console.error(`Error revealing item in folder: ${a}`, n);
      try {
        const s = await Z.openPath(l.dirname(a));
        return s ? { success: !1, error: s } : { success: !0, message: "Could not reveal item, but opened directory." };
      } catch (s) {
        return console.error(`Error opening directory: ${l.dirname(a)}`, s), { success: !1, error: String(n) };
      }
    }
  }), u.handle(
    "save-project-file",
    async (o, a, n, s) => {
      try {
        const h = ar(s) ? s : null;
        if (h)
          return await y.writeFile(
            h,
            JSON.stringify(a, null, 2),
            "utf-8"
          ), F = h, {
            success: !0,
            path: h,
            message: "Project saved successfully"
          };
        const v = (n || `project-${Date.now()}`).replace(/[^a-zA-Z0-9-_]/g, "_"), C = v.endsWith(`.${K}`) ? v : `${v}.${K}`, k = await $.showSaveDialog({
          title: m("dialogs", "fileDialogs.saveProject"),
          defaultPath: l.join(S, C),
          filters: [
            {
              name: m("dialogs", "fileDialogs.openscreenProject"),
              extensions: [K]
            },
            { name: "JSON", extensions: ["json"] }
          ],
          properties: ["createDirectory", "showOverwriteConfirmation"]
        });
        return k.canceled || !k.filePath ? {
          success: !1,
          canceled: !0,
          message: "Save project canceled"
        } : (await y.writeFile(k.filePath, JSON.stringify(a, null, 2), "utf-8"), F = k.filePath, {
          success: !0,
          path: k.filePath,
          message: "Project saved successfully"
        });
      } catch (h) {
        return console.error("Failed to save project file:", h), {
          success: !1,
          message: "Failed to save project file",
          error: String(h)
        };
      }
    }
  ), u.handle("load-project-file", async () => {
    try {
      const o = await $.showOpenDialog({
        title: m("dialogs", "fileDialogs.openProject"),
        defaultPath: S,
        filters: [
          {
            name: m("dialogs", "fileDialogs.openscreenProject"),
            extensions: [K]
          },
          { name: "JSON", extensions: ["json"] },
          { name: m("dialogs", "fileDialogs.allFiles"), extensions: ["*"] }
        ],
        properties: ["openFile"]
      });
      if (o.canceled || o.filePaths.length === 0)
        return { success: !1, canceled: !0, message: "Open project canceled" };
      const a = o.filePaths[0], n = await y.readFile(a, "utf-8"), s = JSON.parse(n), h = await ge(s, a);
      return F = a, A(h), {
        success: !0,
        path: a,
        project: s
      };
    } catch (o) {
      return console.error("Failed to load project file:", o), {
        success: !1,
        message: "Failed to load project file",
        error: String(o)
      };
    }
  }), u.handle("load-current-project-file", async () => {
    try {
      if (!F)
        return { success: !1, message: "No active project" };
      const o = await y.readFile(F, "utf-8"), a = JSON.parse(o), n = await ge(a, F);
      return A(n), {
        success: !0,
        path: F,
        project: a
      };
    } catch (o) {
      return console.error("Failed to load current project file:", o), {
        success: !1,
        message: "Failed to load current project file",
        error: String(o)
      };
    }
  }), u.handle("set-current-recording-session", (o, a) => {
    const n = xe(a);
    return A(n), F = null, { success: !0, session: n ?? void 0 };
  }), u.handle("get-current-recording-session", () => D ? { success: !0, session: D } : { success: !1 }), u.handle("set-current-video-path", async (o, a) => {
    const n = V(a);
    if (!n || !q(n))
      return { success: !1, message: "Video path has not been approved" };
    const s = await cr(n);
    return s ? (re(s.screenVideoPath), s.webcamVideoPath && re(s.webcamVideoPath), A(s)) : A({
      screenVideoPath: n,
      createdAt: Date.now()
    }), F = null, { success: !0 };
  }), u.handle("get-current-video-path", () => D?.screenVideoPath ? { success: !0, path: D.screenVideoPath } : { success: !1 }), u.handle("clear-current-video-path", () => (A(null), { success: !0 })), u.handle("get-platform", () => process.platform), u.handle("get-shortcuts", async () => {
    try {
      const o = await y.readFile(me, "utf-8");
      return JSON.parse(o);
    } catch {
      return null;
    }
  }), u.handle("save-shortcuts", async (o, a) => {
    try {
      return await y.writeFile(me, JSON.stringify(a, null, 2), "utf-8"), { success: !0 };
    } catch (n) {
      return console.error("Failed to save shortcuts:", n), { success: !1, error: String(n) };
    }
  });
}
const L = l.dirname(ne(import.meta.url)), fr = l.join(L, ".."), E = process.env.VITE_DEV_SERVER_URL, X = l.join(fr, "dist"), je = process.env.HEADLESS === "true", gr = process.defaultApp ? l.join(L, "..", "public") : process.resourcesPath, Y = `--asset-base-url=${_e(`${gr}${l.sep}`).toString()}`;
let G = null;
u.on("hud-overlay-hide", () => {
  G && !G.isDestroyed() && G.minimize();
});
function hr() {
  const e = R.getPrimaryDisplay(), { workArea: t } = e, r = 600, i = 160, d = Math.floor(t.x + (t.width - r) / 2), p = Math.floor(t.y + t.height - i - 5), c = new _({
    width: r,
    height: i,
    minWidth: 600,
    maxWidth: 600,
    minHeight: 160,
    maxHeight: 160,
    x: d,
    y: p,
    frame: !1,
    transparent: !0,
    resizable: !1,
    alwaysOnTop: !0,
    skipTaskbar: !0,
    hasShadow: !1,
    show: !je,
    webPreferences: {
      preload: l.join(L, "preload.mjs"),
      additionalArguments: [Y],
      nodeIntegration: !1,
      contextIsolation: !0,
      backgroundThrottling: !1
    }
  });
  return process.platform === "darwin" && c.setVisibleOnAllWorkspaces(!0, { visibleOnFullScreen: !0 }), c.webContents.on("did-finish-load", () => {
    c?.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), G = c, c.on("closed", () => {
    G === c && (G = null);
  }), E ? c.loadURL(E + "?windowType=hud-overlay") : c.loadFile(l.join(X, "index.html"), {
    query: { windowType: "hud-overlay" }
  }), c;
}
function vr() {
  const e = process.platform === "darwin", t = new _({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    ...e && {
      titleBarStyle: "hiddenInset",
      trafficLightPosition: { x: 12, y: 12 }
    },
    transparent: !1,
    resizable: !0,
    alwaysOnTop: !1,
    skipTaskbar: !1,
    title: "OpenScreen",
    backgroundColor: "#000000",
    show: !je,
    webPreferences: {
      preload: l.join(L, "preload.mjs"),
      additionalArguments: [Y],
      nodeIntegration: !1,
      contextIsolation: !0,
      webSecurity: !1,
      backgroundThrottling: !1
    }
  });
  return t.maximize(), t.webContents.on("did-finish-load", () => {
    t?.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), E ? t.loadURL(E + "?windowType=editor") : t.loadFile(l.join(X, "index.html"), {
    query: { windowType: "editor" }
  }), t;
}
function yr() {
  const { width: e, height: t } = R.getPrimaryDisplay().workAreaSize, r = new _({
    width: 620,
    height: 420,
    minHeight: 350,
    maxHeight: 500,
    x: Math.round((e - 620) / 2),
    y: Math.round((t - 420) / 2),
    frame: !1,
    resizable: !1,
    alwaysOnTop: !0,
    transparent: !0,
    backgroundColor: "#00000000",
    webPreferences: {
      preload: l.join(L, "preload.mjs"),
      additionalArguments: [Y],
      nodeIntegration: !1,
      contextIsolation: !0
    }
  });
  return process.platform === "darwin" && r.setVisibleOnAllWorkspaces(!0, { visibleOnFullScreen: !0 }), E ? r.loadURL(E + "?windowType=source-selector") : r.loadFile(l.join(X, "index.html"), {
    query: { windowType: "source-selector" }
  }), r;
}
function wr() {
  const { workArea: e } = R.getPrimaryDisplay(), t = 420, r = 260, i = new _({
    width: t,
    height: r,
    minWidth: t,
    maxWidth: t,
    minHeight: r,
    maxHeight: r,
    x: Math.round(e.x + (e.width - t) / 2),
    y: Math.round(e.y + (e.height - r) / 2),
    frame: !1,
    resizable: !1,
    alwaysOnTop: !0,
    skipTaskbar: !0,
    focusable: !1,
    transparent: !0,
    backgroundColor: "#00000000",
    hasShadow: !1,
    show: !1,
    webPreferences: {
      preload: l.join(L, "preload.mjs"),
      additionalArguments: [Y],
      nodeIntegration: !1,
      contextIsolation: !0,
      backgroundThrottling: !1
    }
  });
  return i.setIgnoreMouseEvents(!0), process.platform === "darwin" && i.setVisibleOnAllWorkspaces(!0, { visibleOnFullScreen: !0 }), E ? i.loadURL(E + "?windowType=countdown-overlay") : i.loadFile(l.join(X, "index.html"), {
    query: { windowType: "countdown-overlay" }
  }), i;
}
const Pr = l.dirname(ne(import.meta.url));
process.platform === "darwin" && x.commandLine.appendSwitch("disable-features", "MacCatapLoopbackAudioForScreenShare");
const S = l.join(x.getPath("userData"), "recordings");
async function Fr() {
  try {
    await y.mkdir(S, { recursive: !0 }), console.log("RECORDINGS_DIR:", S), console.log("User Data Path:", x.getPath("userData"));
  } catch (e) {
    console.error("Failed to create recordings directory:", e);
  }
}
process.env.APP_ROOT = l.join(Pr, "..");
const Sr = process.env.VITE_DEV_SERVER_URL, Tr = l.join(process.env.APP_ROOT, "dist-electron"), Ve = l.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = Sr ? l.join(process.env.APP_ROOT, "public") : Ve;
let g = null, N = null, I = null, j = null, Ee = "";
const br = process.platform === "darwin", Te = br ? 16 : 24, ke = Re("openscreen.png", Te), xr = Re("rec-button.png", Te);
function Oe() {
  g = hr();
}
function z() {
  if (g && !g.isDestroyed()) {
    g.isMinimized() && g.restore(), g.show(), g.focus();
    return;
  }
  Oe();
}
function Cr(e) {
  return e.webContents.getURL().includes("windowType=editor");
}
function Q(e) {
  let t = _.getFocusedWindow() ?? g;
  if (!t || t.isDestroyed() || !Cr(t)) {
    if (Me(), t = g, !t || t.isDestroyed()) return;
    t.webContents.once("did-finish-load", () => {
      !t || t.isDestroyed() || t.webContents.send(e);
    });
    return;
  }
  t.webContents.send(e);
}
function we() {
  const e = process.platform === "darwin", t = [];
  e && t.push({
    label: x.name,
    submenu: [
      { role: "about" },
      { type: "separator" },
      { role: "services" },
      { type: "separator" },
      { role: "hide" },
      { role: "hideOthers" },
      { role: "unhide" },
      { type: "separator" },
      { role: "quit" }
    ]
  }), t.push(
    {
      label: m("common", "actions.file") || "File",
      submenu: [
        {
          label: m("dialogs", "unsavedChanges.loadProject") || "Load Project…",
          accelerator: "CmdOrCtrl+O",
          click: () => Q("menu-load-project")
        },
        {
          label: m("dialogs", "unsavedChanges.saveProject") || "Save Project…",
          accelerator: "CmdOrCtrl+S",
          click: () => Q("menu-save-project")
        },
        {
          label: m("dialogs", "unsavedChanges.saveProjectAs") || "Save Project As…",
          accelerator: "CmdOrCtrl+Shift+S",
          click: () => Q("menu-save-project-as")
        },
        ...e ? [] : [{ type: "separator" }, { role: "quit" }]
      ]
    },
    {
      label: m("common", "actions.edit") || "Edit",
      submenu: [
        { role: "undo" },
        { role: "redo" },
        { type: "separator" },
        { role: "cut" },
        { role: "copy" },
        { role: "paste" },
        { role: "selectAll" }
      ]
    },
    {
      label: m("common", "actions.view") || "View",
      submenu: [
        { role: "reload" },
        { role: "forceReload" },
        { role: "toggleDevTools" },
        { type: "separator" },
        { role: "resetZoom" },
        { role: "zoomIn" },
        { role: "zoomOut" },
        { type: "separator" },
        { role: "togglefullscreen" }
      ]
    },
    {
      label: m("common", "actions.window") || "Window",
      submenu: e ? [{ role: "minimize" }, { role: "zoom" }, { type: "separator" }, { role: "front" }] : [{ role: "minimize" }, { role: "close" }]
    }
  );
  const r = te.buildFromTemplate(t);
  te.setApplicationMenu(r);
}
function Pe() {
  j = new We(ke), j.on("click", () => {
    z();
  }), j.on("double-click", () => {
    z();
  });
}
function Re(e, t) {
  return $e.createFromPath(l.join(process.env.VITE_PUBLIC || Ve, e)).resize({
    width: t,
    height: t,
    quality: "best"
  });
}
function ee(e = !1) {
  if (!j) return;
  const t = e ? xr : ke, r = e ? `Recording: ${Ee}` : "OpenScreen", i = e ? [
    {
      label: m("common", "actions.stopRecording") || "Stop Recording",
      click: () => {
        g && !g.isDestroyed() && g.webContents.send("stop-recording-from-tray");
      }
    }
  ] : [
    {
      label: m("common", "actions.open") || "Open",
      click: () => {
        z();
      }
    },
    {
      label: m("common", "actions.quit") || "Quit",
      click: () => {
        x.quit();
      }
    }
  ];
  j.setImage(t), j.setToolTip(r), j.setContextMenu(te.buildFromTemplate(i));
}
let se = !1, T = !1;
u.on("set-has-unsaved-changes", (e, t) => {
  se = t;
});
function Fe(e) {
  !e || e.isDestroyed() || (T = !0, setImmediate(() => {
    try {
      e.isDestroyed() || e.close();
    } finally {
      T = !1;
    }
  }));
}
function Me() {
  g && (T = !0, g.close(), T = !1, g = null), g = vr(), se = !1, g.on("close", (e) => {
    if (T || !se) return;
    e.preventDefault();
    const t = $.showMessageBoxSync(g, {
      type: "warning",
      buttons: [
        m("dialogs", "unsavedChanges.saveAndClose"),
        m("dialogs", "unsavedChanges.discardAndClose"),
        m("common", "actions.cancel")
      ],
      defaultId: 0,
      cancelId: 2,
      title: m("dialogs", "unsavedChanges.title"),
      message: m("dialogs", "unsavedChanges.message"),
      detail: m("dialogs", "unsavedChanges.detail")
    }), r = g;
    !r || r.isDestroyed() || (t === 0 ? (r.webContents.send("request-save-before-close"), u.once("save-before-close-done", (i, d) => {
      d && Fe(r);
    })) : t === 1 && Fe(r));
  });
}
function Dr() {
  return N = yr(), N.on("closed", () => {
    N = null;
  }), N;
}
function Ar() {
  return I && !I.isDestroyed() || (I = wr(), I.on("closed", () => {
    I = null;
  })), I;
}
x.on("window-all-closed", () => {
});
x.on("activate", () => {
  _.getAllWindows().some((t) => t.isDestroyed() || !t.isVisible() ? !1 : !t.webContents.getURL().includes("windowType=countdown-overlay")) || z();
});
x.whenReady().then(async () => {
  le.defaultSession.setPermissionCheckHandler((t, r) => ["media", "audioCapture", "microphone", "videoCapture", "camera"].includes(r)), le.defaultSession.setPermissionRequestHandler((t, r, i) => {
    i(["media", "audioCapture", "microphone", "videoCapture", "camera"].includes(r));
  }), process.platform === "darwin" && B.getMediaAccessStatus("microphone") !== "granted" && await B.askForMediaAccess("microphone"), u.on("hud-overlay-close", () => {
    x.quit();
  }), u.handle("set-locale", (t, r) => {
    Qt(r), we(), ee();
  }), Pe(), ee(), we(), await Fr();
  function e() {
    g && (T = !0, g.close(), T = !1, g = null), z();
  }
  mr(
    Me,
    Dr,
    Ar,
    () => g,
    () => N,
    () => I,
    (t, r) => {
      Ee = r, j || Pe(), ee(t), t || z();
    },
    e
  ), Oe();
});
export {
  Tr as MAIN_DIST,
  S as RECORDINGS_DIR,
  Ve as RENDERER_DIST,
  Sr as VITE_DEV_SERVER_URL
};
