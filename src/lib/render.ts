
/**
 * Module dependencies.
 */

import views from 'koa-views';
import  path  from 'path';
 
 // setup views mapping .html
 // to the swig template engine
 
 function render() {

  return views(path.join(__dirname, '/../views'), {
   map: { html: 'swig' }
 });
}

 export default render;