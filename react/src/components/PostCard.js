import React from 'react';
import { Card, CardHeader, CardContent, CardActions, Avatar, Typography, IconButton } from '@mui/material';
import { Favorite as FavoriteIcon, Comment as CommentIcon, Share as ShareIcon } from '@mui/icons-material';

const PostCard = ({ post }) => {
  return (
    <Card className="card" elevation={0} sx={{ border: '1px solid #EDEDED' }}>
      <CardHeader
        avatar={<Avatar src={post.avatar} />}
        title={post.author}
        subheader={post.date}
      />
      <CardContent>
        <Typography variant="body1">{post.content}</Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="like">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="comment">
          <CommentIcon />
        </IconButton>
        <IconButton aria-label="share" sx={{ marginLeft: 'auto' }}>
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default PostCard;
