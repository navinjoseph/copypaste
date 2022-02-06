
/**
 * Module dependencies.
 */

import views from 'koa-views';
import  path  from 'path';
 
 // setup views mapping .html
 // to the swig template engine
 
 const render = views(path.join(__dirname, '/../views'), {
   map: { html: 'swig' }
 });

 export default render;