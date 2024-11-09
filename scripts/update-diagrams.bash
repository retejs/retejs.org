set -eW

source_dir="./src/assets/diagrams/"
dest_dir="./public/diagrams/"

docker run $1 -v $(pwd):/data rlespinasse/drawio-export -f svg --remove-page-suffix -o _export

rm -rf $dest_dir
rsync -av --include='*/' --include='_export/*' --exclude='*' "$source_dir/" "$dest_dir/"
find $dest_dir -type f -name '*.svg' -exec sh -c 'newpath=$(echo {} | sed "s/_export\///"); mv {} $newpath' \;
