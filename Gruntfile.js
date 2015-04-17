module.exports = function(grunt) {
// 1. Вся настройка находится здесь
grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),
	concat: { // Объединяет файлы в один
		options: {
			separator: ';',
		},
		//scripts: {
			dist: {
				src: ['js/common.js', 'js/bootstrap.js'],
				dest: 'js/production.js',
			}
		//}
	},
	less: { // Компилятор less
		development: {
			options: {
				compress: true,
				yuicompress: true,
				optimization: 2
			},
			files: {
				"css/style.css": "less/1style.less"
			}
		}
	},
	uglify: { // Минимизирует файлы
	    build: {
	        src: 'js/production.js',
	        dest: 'js/production.min.js'
	    }
	},
	watch: { // Отслеживание изменений в файлах
		styles: {
			files: ['less/*.less'], // какие файлы отслеживаем
			tasks: ['less'], // какие задачи запускаем
			options: {
				nospawn: true // TODO: Узнать что это
			}
		},
		scripts: {
			files: ['js/common.js'], // какие файлы отслеживаем
			tasks: ['concat', 'uglify'], // какие задачи запускаем
			options: {
				nospawn: true
			}
		}
	}
});
// 3. Тут мы указываем Grunt, что хотим использовать этот плагин
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-less');
grunt.loadNpmTasks('grunt-contrib-watch');
// 4. Указываем, какие задачи выполняются, когда мы вводим grunt в терминале
grunt.registerTask('default', ['watch', 'concat', 'uglify']);
};