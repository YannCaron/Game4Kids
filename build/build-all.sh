#!/bin/bash

declare BUILD_TOOLS
BUILD_TOOLS=$(realpath "$(dirname "$0")")
declare -r BUILD_TOOLS

# Python script must be run from current directory
pushd "${BUILD_TOOLS}"

for file in *.py
do
  echo "Running: ${file}"
  python "${file}"
done

popd
