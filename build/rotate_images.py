#!/usr/bin/env python
"""
Rotate PNG pictures existing in 'tmp' folder
"""
import glob
from PIL import Image


def main():
    """
    main
    """
    for filename in glob.iglob('tmp/*.png'):
        print filename
        img = Image.open(filename)
        img = img.rotate(-90, expand=True)
        img.save(filename)


main()
