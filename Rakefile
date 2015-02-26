require "stringex"

new_post_ext = "md"
posts_dir    = "_posts"
images_dir    = "images/posts"

desc "Begin a new post in _posts"
task :new_post, :title do |t, args|
  args.with_defaults(:title => 'new-post')
  title = args.title
  postname = "#{Time.now.strftime('%Y-%m-%d')}-#{title.to_url}"
  mkdir_p "#{posts_dir}"
  mkdir_p "#{images_dir}/#{postname}"
  filename = "#{posts_dir}/#{postname}.#{new_post_ext}"
  if File.exist?(filename)
    abort("rake aborted!") if ask("#{filename} already exists. Do you want to overwrite?", ['y', 'n']) == 'n'
  end
  puts "Creating new post: #{filename}"
  open(filename, 'w') do |post|
    post.puts "---"
    post.puts "layout: post"
    post.puts "title: \"#{title.gsub(/&/,'&amp;')}\""
    post.puts "description: foo"
    post.puts "date: #{Time.now.strftime('%Y-%m-%d %H:%M')}"
    post.puts "image:"
    post.puts "  thumb: #{postname}/foo.png"
    post.puts "comments: true"
    post.puts "share: true"
    post.puts "tags: "
    post.puts "- foo"
    post.puts "---"

  end
end
