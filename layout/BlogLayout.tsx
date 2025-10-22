import Image from 'next/image'
import ScrollProgressBar from '@components/ScrollProgressBar'
import { useState, useEffect } from 'react'
import { opacityVariant, popUp } from '@content/FramerMotionVariants'
import AnimatedDiv from '@components/FramerMotion/AnimatedDiv'
import { getFormattedDate } from '@utils/date'
import { BlogType, ProfileType, LikeStatusType, ViewsType } from '@lib/types'
import TableOfContents from '@components/TableOfContents'
import cn from 'classnames'
import Prism from '../prismSetup'
import { motion } from 'framer-motion'
import readTime from 'reading-time'
import CommentSection from '@components/BlogComment/CommentSection'
import CommentList from '@components/BlogComment/CommentList'
import { AiFillEye, AiFillLike, AiOutlineLike } from 'react-icons/ai'
import useWindowSize from '@hooks/useWindowSize'
import { addBlogLike, addBlogViews } from '@lib/backendAPI'
import { useClientID } from '@context/clientIdContext'

export default function BlogLayout({
  blog,
  profileInfo
}: {
  blog: BlogType
  profileInfo: ProfileType
}) {
  const [isTOCActive, setIsTOCActive] = useState(false)
  const hasCode = blog && blog.content.includes('<code>')
  const size = useWindowSize()
  const [blogInfoFull, setBlogInfoFull] = useState(false)
  const [_likeStatus, setLikeStatus] = useState<LikeStatusType>()
  const [fakeTotalLikes, setFakeTotalLikes] = useState<number>(blog.total_likes)
  const [fakeLikeStatus, setFakeLikeStatus] = useState<boolean>(blog.user_liked)
  const [totalViews, setTotalViews] = useState<number>(blog.total_views)
  const BLOG_ENDPOINT = 'https://daveescott0509.com' + '/blogs/' + blog.slug

  const { clientID } = useClientID()

  const addLike = async (slug: string) => {
    if (!clientID) return
    const likeStatusData: LikeStatusType = await addBlogLike(clientID, slug)
    setLikeStatus(likeStatusData)
  }

  const fetchTotalViews = async (slug: string) => {
    if (!clientID) return
    const totalViewsData: ViewsType = await addBlogViews(clientID, slug)
    setTotalViews(totalViewsData.total_views)
  }

  let readingTime = null
  if (!hasCode) {
    readingTime = readTime(blog.content)
  }

  const injectStyle = () => {
    if (hasCode) {
      const style = document.createElement('style')
      style.innerHTML = `
        .text-code code {
          color: #78a5b3
        }
      `
      document.head.appendChild(style)
    }
  }

  useEffect(() => {
    // Syntax Highlighting
    injectStyle()
    // Prism JS
    if (typeof window !== 'undefined') {
      Prism.highlightAll()
      // Prism.plugins.lineNumbers = true
    }
    if (size.width > 1600) {
      setBlogInfoFull(true)
    } else {
      setBlogInfoFull(false)
    }
  }, [size, hasCode])

  useEffect(() => {
    if (blog.slug) {
      fetchTotalViews(blog.slug)
    }
  }, [])

  return (
    <section className="mt-[44px] md:mt-[60px] relative !overflow-hidden">
      {/* TOC */}
      {blog.table_of_contents != null && blog.table_of_contents.length > 0 && (
        <div className="hide-on-print">
          <TableOfContents
            isTOCActive={isTOCActive}
            setIsTOCActive={setIsTOCActive}
            tableOfContents={blog.table_of_contents}
          />
        </div>
      )}

      {/* Blog Content */}
      <section
        className="p-5 sm:pt-10 relative font-barlow prose dark:prose-invert md:ml-[30%] lg:ml-[30%] print:!mx-auto bg-darkWhitePrimary dark:bg-darkPrimary"
        style={{
          maxWidth: '900px',
          opacity: isTOCActive ? "0.3" : "1",
          margin: blog?.table_of_contents && blog.table_of_contents.length <= 0 ? "auto" : undefined,
        }}
      >
        <ScrollProgressBar />
        {/* Blog Cover Image */}
        <div className="flex items-center justify-center mb-4">
          <Image
            alt={blog.title}
            width={1000}
            height={1000}
            quality={50}
            style={{ width: 'auto', height: 'auto' }}
            src={blog.image}
            className="rounded-xl shadow filter !m-0"
          />
        </div>
        {/* Blog Title */}
        <h1 className="text-center text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white mt-10">
          {blog.title}
        </h1>

        <div className="!w-full text-gray-700 dark:text-gray-300">
          <div className="w-full">
            <div className={`${blogInfoFull ? 'fixed right-0 px-10 opacity-100 top-[50px] md:top-[80px] author' : ''}`}>
              {blog.author === 'Davee Scott' && profileInfo.image !== null && (
                <motion.div
                  variants={popUp}
                  className="relative flex items-center justify-center p-3 rounded-full overflow-hidden w-44 h-44 xs:w-30 xs:h-30 before:absolute before:inset-0 before:border-t-4 before:border-b-4 before:border-black before:dark:border-white before:rounded-full before:animate-photo-spin"
                >
                  <Image
                    src={profileInfo.image}
                    className="rounded-full shadow filter"
                    width={933}
                    height={933}
                    alt="cover Profile Image"
                    quality={100}
                  />
                </motion.div>
              )}
              <div className="mt-2">
                <span className="text-base text-gray-500">Author: </span>
                <span className="font-bold text-base text-gray-600 dark:text-gray-400">{blog.author}</span>
              </div>

              <div className="mt-2 text-base text-gray-500">
                <span>Created at: </span>
                <span className="font-bold">{getFormattedDate(new Date(blog.created_at))}</span>
              </div>

              {getFormattedDate(new Date(blog.created_at)) !== getFormattedDate(new Date(blog.updated_at)) && (
                <div className="text-base text-gray-500 mb-2">
                  <span>Last Update: </span>
                  <span className="font-bold">{getFormattedDate(new Date(blog.updated_at))}</span>
                </div>
              )}

              {blog.category && (
                <div className="text-base text-gray-500 mb-2">
                  <span>Category: </span>
                  <span className="font-bold">{blog.category.name}</span>
                </div>
              )}

              {!hasCode && readingTime && (
                <div>
                  <div className="text-base text-gray-500">
                    <span>Reading Time: </span>
                    <span className="font-bold">{readingTime.text}</span>
                  </div>

                  <div className="text-base text-gray-500 mb-3">
                    <span>Total Words: </span>
                    <span className="font-bold">{readingTime.words}</span>
                  </div>
                </div>
              )}

              {/* Total Views and Likes */}
              <div className="flex flex-wrap items-center gap-4 w-fit print:hidden">
                <div className="flex flex-wrap items-center gap-2">
                  <AiFillEye className="w-4 h-4" />
                  <span className="text-base text-gray-500">{totalViews}</span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <AiFillLike className="w-4 h-4" />
                  <span className="text-base text-gray-500">{fakeTotalLikes}</span>
                </div>
              </div>
            </div>

            {blog.overview && (
              <div className="text-lg my-4" dangerouslySetInnerHTML={{ __html: blog.overview || '' }}></div>
            )}

            {blog.tags && (
              <div className="flex flex-wrap items-center gap-1 hide-on-print">
                <span className="text-base text-gray-500">Tags: </span>
                {blog.tags.split(',').map((tag, index) => {
                  return (
                    <span key={`${tag}-${index}`} className="px-2 py-1 text-xs rounded bg-teal-800 text-gray-50">
                      {tag.toLowerCase()}
                    </span>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* Horizontal Line */}
        {/* <div className="relative flex mt-5 items-center">
          <div className="flex-grow border-t border-gray-400"></div>
          <span className="flex-shrink mx-4 text-gray-700 dark:text-gray-400">Content</span>
          <div className="flex-grow border-t border-gray-400"></div>
        </div> */}

        {/* Blog Content */}

        <AnimatedDiv
          variants={opacityVariant}
          className="my-16 max-w-full prose-sm blog-container sm:prose-base prose-pre:bg-white prose-img:mx-auto prose-img:rounded-md dark:prose-pre:bg-darkSecondary prose-pre:saturate-150 dark:prose-pre:saturate-100 marker:text-black dark:marker:text-white"
        >
          <div
            dangerouslySetInnerHTML={{ __html: blog.content }}
            className={cn('my-4', { 'text-code': hasCode, 'line-numbers': hasCode })}
          />
        </AnimatedDiv>

        {/* Like Button */}
        <div className='print:hidden'>
          <div className="flex items-center w-full mt-10 mb-5">
            <div className="cursor-pointer">
              {fakeLikeStatus === true ? (
                <AiFillLike
                  className="w-10 h-10"
                  onClick={() => {
                    addLike(blog.slug)
                    setFakeTotalLikes(fakeTotalLikes - 1)
                    setFakeLikeStatus(false)
                  }}
                />
              ) : fakeLikeStatus === false ? (
                <AiOutlineLike
                  className="w-10 h-10"
                  onClick={() => {
                    addLike(blog.slug)
                    setFakeTotalLikes(fakeTotalLikes + 1)
                    setFakeLikeStatus(true)
                  }}
                />
              ) : null}
            </div>
            <div className="mx-2 font-bold">{fakeTotalLikes}</div>
          </div>
        </div>
        <div className="hide-on-print">
          <CommentSection slug={blog.slug} contentURL={BLOG_ENDPOINT} />
          <CommentList slug={blog.slug} />
        </div>
      </section>
    </section>
  )
}
