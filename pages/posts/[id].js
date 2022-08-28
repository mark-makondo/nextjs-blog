import React from 'react';
import Layout from '../../components/Layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import propTypes from 'prop-types';
import Head from 'next/head';
import Date from '../../components/Date';
import utilStyles from '../../stylesheets/util.module.css';

Post.propTypes = {
    postData: propTypes.shape({
        title: propTypes.string,
        id: propTypes.string,
        date: propTypes.string,
        contentHtml: propTypes.object,
    }),
};

export default function Post({ postData }) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={postData.date} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </article>
        </Layout>
    );
}

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
export const getStaticPaths = async () => {
    return {
        paths: getAllPostIds(),
        fallback: false,
    };
};

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.
export const getStaticProps = async ({ params }) => {
    const postData = await getPostData(params.id);

    return {
        props: { postData },
    };
};
