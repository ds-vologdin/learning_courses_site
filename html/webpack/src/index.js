import './less/main.less';
import './less/timetable.less';
import './less/courses.less';

import {set_handler_timetable} from './timetable';
import {set_handler_main_menu} from './main_menu';
import {set_handler_main_page_arrow} from './main';
import {set_handler_register_form} from './register_form'
import {fetch_courses} from './courses'

set_handler_main_menu();
set_handler_main_page_arrow();
set_handler_timetable();
set_handler_register_form();
fetch_courses();
