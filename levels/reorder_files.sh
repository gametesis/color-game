 
generate_random_string() {
  tr -dc 'a-zA-Z0-9' </dev/urandom | head -c 5
}




# first passage to change files names, to stop collisions in renames
for file in $(ls -1v ./*); do
    file_name=$(basename "$file");
    if [ $file_name != "reorder_files.sh" ]; then
        # Call the function and store the result in a variable
        random_string=$(generate_random_string)
        # change file name
        mv ./$file_name "./${file_name}_${random_string}"
    fi
done
 
index=0
for file in $(ls -1v ./*); do

    file_name=$(basename "$file");
    if [ $file_name != "reorder_files.sh" ]; then
        new_file_name="${index}.json"
        next_index=$((index + 1))
        next_file_name="{{home}}/${next_index}.json"
        # Specify the string to replace and the replacement string
        original_string='"next_level":[^,]*,'
        replacement_string="\"next_level\":\"${next_file_name}\","

        # Use sed to replace the string in the file
        sed -i "s#$original_string#$replacement_string#g" "$file"

        # change file name
        mv ./$file_name ./$new_file_name

        echo "$file_name $new_file_name $replacement_string";
        ((index++))
    fi
done
