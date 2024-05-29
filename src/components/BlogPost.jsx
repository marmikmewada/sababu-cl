import styles from "./BlogPost.module.css";

function BlogPost({ post }) {
  return (
    <li className={styles.blog}>
      <div
        className={`${styles.blogPost}`}
        style={{ backgroundImage: `url(${BlogPost.imgUrl})`, borderRadius: "1rem" }}
      >
        <div className={styles.postDate}>
          <span>{BlogPost.postedBy}</span>
          <span>{new Date().toLocaleDateString()}</span>
        </div>
        <div className={styles.blogContent}>
          <h2 className={styles.title}>{BlogPost.title}</h2>
          <div className={styles.details}>
            <div className={styles.icons}>
              <div className={styles.views}>
                <div className={styles.viewCount}>
                  <i className="fa-regular fa-eye"></i>
                  {/* <span>{post.views}</span> */}
                </div>
                <div className={styles.comments}>
                  <i className="fa-regular fa-message"></i>
                  {/* <span>{post.comments}</span> */}
                </div>
              </div>
              <div className={styles.likes}>
                {/* <span>{post.likes}</span> */}
                <i className="fa-regular fa-heart"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export default BlogPost;
