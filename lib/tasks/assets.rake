# lib/tasks/assets.rake
#
# Before compiling Sprockets assets, clean out all existing files, and any previous manifests.
# - Old manifests and files can create collisions when symlinking *-bundle.js import files,
# - which are fatal errors.
Rake::Task["assets:precompile"]
  .enhance(["assets:clean_compiled"])

namespace :assets do
  task :clean_compiled do
    puts "*" * 100
    puts "Cleaning public/assets dir before Sprockets processing. This avoids having missing or collided Webpacked files, especially *-bundle.js `import` files (code splits)."
    puts "*" * 100
    rm_r Dir.glob(Rails.root.join("public/assets"))
  end
end
