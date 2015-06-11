require 'json'

get '/' do

  $temp_holder = []

  redirect '/posts'
end

#display everything on the index
get '/posts' do
  @posts = Post.all
  erb :index
end
#updating the vote count next to a post

get '/posts/:id/vote' do
  id = params[:id].to_i
  post = Post.find(id)
  post.votes.create(value: 1)

  if request.xhr?
    {article_id: id, votes: post.points}.to_json
  else
    redirect "/posts"
  end
end

delete '/posts/:id' do
  id = params[:id].to_i
  post = Post.find(id)
  post.destroy

  if request.xhr?
    {article_id: id}.to_json
  else
    redirect "/posts"
  end

end

post '/posts' do
  Post.create( title: params[:title],
               username: Faker::Internet.user_name,
               comment_count: rand(1000) )
  redirect '/posts'
end

get '/post/:id' do
  @post = Post.find(params[:id])
  erb :post
end
