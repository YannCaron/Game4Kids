#!/usr/bin/env python
"""
Build global index for resources
"""
import glob

ASSETS = '../assets/'
OUTPUT_FILE = '../resources.js'

STRATEGIES = {
    "Brick-paddleBlu" : ("w", "h-80", "cw", "ch"),
    "Brick-paddleRed" : ("w", "h-80", "cw", "ch"),
    "Platformer-Cloud1" : ("w", "h-40", "cw", "h-20"),
    "Platformer-Cloud2" : ("w", "h-40", "cw", "h-20"),
    "Platformer-Cloud3" : ("w", "h-40", "cw", "h-20"),
    "Platformer-bush" : ("w", "h-15", "cw", "h-10"),
    "Platformer-spikes" : ("w", "h", "cw", "ch"),
    "SpaceArt-laserGreen" : ("w-24", "h-24", "cw", "ch"),
    "SpaceArt-laserRed" : ("w-24", "h-24", "cw", "ch"),
    "TappyPlane-rock" : ("w-90", "h", "cw+10", "ch"),
    "TappyPlane-rockDown" : ("w-90", "h", "cw+10", "ch"),
    "TappyPlane-rockGrass" : ("w-90", "h", "cw+10", "ch"),
    "TappyPlane-rockGrassDown" : ("w-90", "h", "cw+10", "ch"),
    "TappyPlane-rockIce" : ("w-90", "h", "cw+10", "ch"),
    "TappyPlane-rockIceDown" : ("w-90", "h", "cw+10", "ch"),
    "TappyPlane-rockSnow" : ("w-90", "h", "cw+10", "ch"),
    "TappyPlane-rockSnowDown" : ("w-90", "h", "cw+10", "ch"),
    "ShootingGallery-stick-metal-outline" : ("w - 15", "h", "cw", "ch"),
    "ShootingGallery-stick-metal-outline-broken" : ("w", "h", "cw", "ch"),
    "ShootingGallery-stick-woodFixed-outline" : ("w - 15", "h", "cw", "ch"),
    "ShootingGallery-stick-wood-outline" : ("w - 15", "h", "cw", "ch"),
    "ShootingGallery-stick-wood-outline-broken" : ("w", "h", "cw", "ch"),
}

DEFAULT_STRATEGY = ("Math.min(w, h)", "Math.min(w, h)", "cw", "ch")

def get_strategy(key):
    """
    return the strategy depending the key
    """
    if key in STRATEGIES : 
        return STRATEGIES[key]
    else:
        return DEFAULT_STRATEGY

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
            strategy = get_strategy(key)

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
            output_file.write('#')
            output_file.write(strategy[0])
            output_file.write('#')
            output_file.write(strategy[1])
            output_file.write('#')
            output_file.write(strategy[2])
            output_file.write('#')
            output_file.write(strategy[3])
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
