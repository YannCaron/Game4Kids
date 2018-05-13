#!/usr/bin/env python
"""
Build global index for resources
"""
import glob

ASSETS = '../assets/'
OUTPUT_FILE = '../resources.js'


def to_root_path(filename):
    """
    return full path for filename
    """
    return filename.replace('../', '')


def to_code_name(filename, replace):
    """
    normalize filename
    """
    return filename.replace(replace, "")\
        .replace(".png", "")\
        .replace("/", "-")\
        .replace(" ", "-")\
        .replace("_", "-")


def main():
    """
    main
    """
    output_file = open(OUTPUT_FILE, 'w')

    # Header
    output_file.write('// GENERATED FILE.\n')
    output_file.write('\n')

    # package
    output_file.write('// package\n')
    output_file.write('var Blockly4kids = Blockly4kids || {};\n')
    output_file.write('\n')

    # images
    output_file.write('// game images for actor creation\n')
    output_file.write('Blockly4kids.gameImages = {};\n')
    for directory in sorted(glob.iglob(ASSETS + 'img/*')):
        category = to_code_name(directory, ASSETS + 'img/')
        output_file.write('Blockly4kids.gameImages[\'' + category + '\'] = [\n')

        first = True
        for filename in sorted(glob.iglob(directory + '/*.png')):
            key = to_code_name(filename, ASSETS + 'img/')
            filename_relative = to_root_path(filename)

            if not first:
                output_file.write(',\n')
            first = False

            output_file.write('\t[{ src: \'')
            output_file.write(filename_relative)
            output_file.write('\', width: 50, height: 50 }, ')
            output_file.write('\'')
            output_file.write(key)
            output_file.write('#')
            output_file.write(filename_relative)
            output_file.write('\'')
            output_file.write(']')

        output_file.write('\n];\n')

    output_file.close()

    output_file = open(OUTPUT_FILE, 'r')
    # lines =
    output_file.readlines()
    # print (''.join(lines))
    output_file.close()


main()
