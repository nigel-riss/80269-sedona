'use strict';

module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    var config = {
        pkg: grunt.file.readJSON('package.json'),


        sass: {
            style: {
                files: [{
                    'build/css/style.css': 'source/sass/style.scss'
                }, {
                    'source/css/style.min.css': 'source/sass/style.scss'
                }]
            }
        },

        postcss: {
            options: {
                processors: [
                    require('autoprefixer')({
                        browsers: 'last 2 versions'
                    })
                ]
            },
            style: {
                src: 'build/css/*.css'
            }
        },

        cmq: {
            style: {
                files: {
                    'build/css': ['build/css/style.css']
                }
            }
        },

        csscomb: {
            style: {
                expand: true,
                src: ['source/sass/**/*.scss', 'build/css/**/*.css']
            }
        },

        cssmin: {
            options: {
                keepSpecialComments: 0,
                report: "gzip"
            },
            style: {
                files: {
                    "build/css/style.min.css": ["build/css/style.css"]
                }
            }
        },

        imagemin: {
            images: {
                options: {
                    optimizationLevel: 3
                },
                files: [{
                    expand: true,
                    src: ['build/img/**/*.{png, jpg, gif, svg}']
                }]
            }
        },
        
        copy: {
            build: {
                files: [{
                    expand: true,
                    cwd: "source",
                    src: [
                        "img/**",
                        "js/**",
                        "index.html",
                        "form.html"
                    ],
                    dest: "build"
                }]
            }
        },
        
        clean: {
            build: ["build"]
        },

        watch: {
            style: {
                files: ['source/sass/**/*.scss'],
                tasks: ['sass'],
//                tasks: ['sass', 'postcss'],
                options: {
                    spawn: false,
                    livereload: true
                }
            }
        }
    };

    //config = require('./.gosha')(grunt, config);

    grunt.initConfig(config);

    grunt.registerTask("build", [
        "clean",
        "copy",
        "sass",
        "cmq",
        "postcss",
        "csscomb",
        "cssmin",
        "imagemin"
    ]);
};