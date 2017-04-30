var vendorRoot = 'vendor/';

module.exports = {
  js: [
    'jsnlog/jsnlog.min.js',
    'jquery/dist/jquery.min.js',
    'file-saver.js/FileSaver.js',
    'pdfmake/build/pdfmake.js',
    'pdfmake/build/vfs_fonts.js',
    'angular/angular.js',
    'angular-bootstrap/ui-bootstrap-tpls.js',
    'toastr/toastr.js',
    'angular-ui-router/release/angular-ui-router.js',
    'angular-toastr/dist/angular-toastr.tpls.js',
    'angular-resource/angular-resource.js',
    'textAngular/dist/textAngular-sanitize.min.js',
    'angular-route/angular-route.min.js',
    'angular-file-saver/dist/angular-file-saver.min.js',
    'angular-animate/angular-animate.js',
    'angular-touch/angular-touch.min.js',
    'angular-cookies/angular-cookies.min.js',
    'angular-ui-mask/dist/mask.min.js',
    'ngstorage/ngStorage.min.js',
    'moment/min/moment-with-locales.min.js',
    'angular-momentjs/angular-momentjs.min.js',
    'angular-tour/dist/angular-tour.min.js',
    'bootstrap-switch/dist/js/bootstrap-switch.min.js',
    'angular-bootstrap-switch/dist/angular-bootstrap-switch.min.js',
    'angular-local-storage/dist/angular-local-storage.min.js'
  ].map(function(path) {
    return vendorRoot + path;
  }),

  css: [
    'bootstrap/dist/css/bootstrap.css',
    'font-awesome/css/font-awesome.css',
    'toastr/toastr.css',
    'angular-toastr/dist/angular-toastr.css',
    'bootstrap-switch/dist/css/bootstrap2/bootstrap-switch.min.css',
    'angular-tour/dist/angular-tour.css',
  ].map(function(path) {
    return vendorRoot + path;
  }),

  fonts: [
    'font-awesome/fonts/fontawesome-webfont.eot',
    'font-awesome/fonts/fontawesome-webfont.svg',
    'font-awesome/fonts/fontawesome-webfont.ttf',
    'font-awesome/fonts/fontawesome-webfont.woff',
    'font-awesome/fonts/fontawesome-webfont.woff2',
    'font-awesome/fonts/FontAwesome.otf',
    'bootstrap/fonts/glyphicons-halflings-regular.eot',
    'bootstrap/fonts/glyphicons-halflings-regular.svg',
    'bootstrap/fonts/glyphicons-halflings-regular.ttf',
    'bootstrap/fonts/glyphicons-halflings-regular.woff',
    'bootstrap/fonts/glyphicons-halflings-regular.woff2',
  ].map(function(path) {
    return vendorRoot + path;
  }),
}