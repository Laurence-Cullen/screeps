module.exports = function (grunt) {
    require('time-grunt')(grunt);

    // Pull defaults (including username and password) from .screeps.json
    const config = require('./.screeps.json');

    // Allow grunt options to override default configuration
    const branch = grunt.option('branch') || config.branch;
    const email = grunt.option('email') || config.email;
    const password = grunt.option('password') || config.password;
    const ptr = grunt.option('ptr') ? true : config.ptr;
    const private_directory = grunt.option('private_directory') || config.private_directory;


    const current_date = new Date();
    grunt.log.subhead('Task Start: ' + current_date.toLocaleString());
    grunt.log.writeln('Branch: ' + branch);

    // Load needed tasks
    grunt.loadNpmTasks('grunt-screeps');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-file-append');
    grunt.loadNpmTasks("grunt-jsbeautifier");
    grunt.loadNpmTasks("grunt-rsync");
    grunt.loadNpmTasks('grunt-string-replace');


    grunt.initConfig({

        // Push all files in the dist folder to screeps. What is in the dist folder
        // and gets sent will depend on the tasks used.
        screeps: {
            options: {
                email: email,
                password: password,
                branch: branch,
                ptr: ptr
            },
            dist: {
                src: ['dist/*.js']
            }
        },


        // Copy all source files into the dist folder, flattening the folder
        // structure by converting path delimiters to underscores
        copy: {
            // Pushes the game code to the dist folder so it can be modified before
            // being send to the screeps server.
            screeps: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: '**',
                    dest: 'dist/',
                    filter: 'isFile',
                    rename: function (dest, src) {
                        // Change the path name utilize underscores for folders
                        return dest + src.replace(/\//g, '_');
                    }
                }],
            }
        },

        // task to find and replace require statements in source code after file structure flattening
        'string-replace': {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'dist/',
                    src: '*.js',
                    dest: 'dist/'
                }],
                options: {
                    replacements: [{
                        pattern: /require\('[A-Za-z0-9_\/]*'\)/g,
                        replacement: function (match) {
                            match = match.replace("src/", "");
                            return match.replace(/\//g, "_");
                        }
                    }]
                }
            }
        },


        // Copy files to the folder the client uses to sync to the private server.
        // Use rsync so the client only uploads the changed files.
        rsync: {
            options: {
                args: ["--verbose", "--checksum"],
                exclude: [".git*"],
                recursive: true
            },
            private: {
                options: {
                    src: './dist/',
                    dest: private_directory,
                }
            },
        },


        // Add version variable using current timestamp.
        file_append: {
            versioning: {
                files: [
                    {
                        append: "\nglobal.SCRIPT_VERSION = " + current_date.getTime() + "\n",
                        input: 'dist/version.js',
                    }
                ]
            }
        },


        // Remove all files from the dist folder.
        clean: {
            'dist': ['dist']
        },


        // Apply code styling
        jsbeautifier: {
            modify: {
                src: ["src/**/*.js"],
                options: {
                    config: '.jsbeautifyrc'
                }
            },
            verify: {
                src: ["src/**/*.js"],
                options: {
                    mode: 'VERIFY_ONLY',
                    config: '.jsbeautifyrc'
                }
            }
        }

    });

    // Combine the above into a default task
    grunt.registerTask('default', ['clean', 'copy:screeps', 'string-replace', 'file_append:versioning', 'screeps']);
    grunt.registerTask('private', ['clean', 'copy:screeps', 'string-replace', 'file_append:versioning', 'rsync:private']);
    grunt.registerTask('test', ['jsbeautifier:verify']);
    grunt.registerTask('pretty', ['jsbeautifier:modify']);
};