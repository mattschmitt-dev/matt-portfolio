// Page Components START
import Metadata from '@components/MetaData'
import { FadeContainer, headingFromLeft, opacityVariant, popUp } from '@content/FramerMotionVariants'
import AnimatedHeading from '@components/FramerMotion/AnimatedHeading'
import getRSS from '@lib/generateRSS'
import generateSitemap from '@lib/sitemap'
import { homeProfileImage } from '@utils/utils'
import { motion } from 'framer-motion'
import { FiDownload } from 'react-icons/fi'
import pageMeta from '@content/meta'
import staticData from '@content/StaticData'
import React from 'react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getProfileInfo } from '@lib/backendAPI'
import { ProfileType } from '@lib/types'
import { BsDiscord, BsGithub, BsTelegram } from 'react-icons/bs'
import Image from 'next/image'

export default function Home() {

  const [profileInfo, setProfileInfo] = useState<ProfileType>()

  const fetchProfileInfo = async () => {
    const profileData: ProfileType = await getProfileInfo()
    setProfileInfo(profileData)
  }

  useEffect(() => {
    fetchProfileInfo()
  }, [])

  return (
    <>
      <Metadata
        title="Matthew Schmitt's Portfolio"
        description={pageMeta.home.description}
        previewImage={pageMeta.home.image}
        keywords={pageMeta.home.keywords}
      />
      <div className="relative max-w-4xl mx-auto bg-darkWhitePrimary dark:bg-darkPrimary dark:text-gray-100 2xl:max-w-5xl 3xl:max-w-7xl">
        <motion.section
          initial="hidden"
          whileInView="visible"
          variants={FadeContainer}
          viewport={{ once: true }}
          className="grid min-h-screen py-20 place-content-center"
        >
          <div className="relative flex flex-col items-center w-full gap-10 mx-auto">
            <motion.div
              variants={popUp}
              className="relative flex items-center justify-center p-3 rounded-full overflow-hidden w-44 h-44 xs:w-64 xs:h-64 before:absolute before:inset-0 before:border-t-4 before:border-b-4 before:border-black before:dark:border-white before:rounded-full before:animate-photo-spin"
            >
              <Image
                src={profileInfo?.image || homeProfileImage}
                className="rounded-full shadow filter"
                width={933}
                height={933}
                alt="Matt's Profile Image"
                quality={60}
              />
            </motion.div>

            <div className="flex flex-col w-full gap-3 p-5 text-center select-none">
              <div className="flex flex-col gap-1">
                <motion.h1 variants={opacityVariant} className="text-5xl font-bold lg:text-6xl font-arial">
                  {profileInfo?.name || staticData.personal.name}
                </motion.h1>
                <motion.p
                  variants={opacityVariant}
                  className="font-medium text-xs md:text-sm lg:text-2xl text-[#383838] dark:text-gray-200 mt-4"
                >
                </motion.p>
              </div>

              <motion.p
                variants={opacityVariant}
                className="text-[#474747] dark:text-gray-300 font-medium text-sm md:text-base text-center"
              >
                {profileInfo?.about || staticData.personal.about}
              </motion.p>

              <div className="flex items-center justify-center p-4">
                <div className="w-1/2 h-0.5 bg-gradient-to-r from-gray-300 via-transparent to-gray-300"></div>
              </div>

              {/* Contact Section */}
              <motion.div
                variants={opacityVariant}
                className="text-[#474747] dark:text-gray-300 font-small font-light text-sm md:text-base text-center"
              >
                {/* Address */}
                <div>Address: {'Cincinnati, OH'}</div>
              </motion.div>

              <motion.div variants={opacityVariant} className="flex items-center justify-center gap-2 mt-4">
                {/* Telegram */}
                <div className="w-6 h-6 mt-2 mr-2">
                  <Link
                    href={"https://t.me/"}
                    title="Telegram"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <BsTelegram className="w-full h-full transition-all hover:scale-110 active:scale-90" />
                  </Link>
                </div>

                {/* Discord*/}
                <div className="w-6 h-6 mt-2 mr-2">
                  <Link
                    href={"https://discord.com/users/"}
                    title="Discord"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <BsDiscord className="w-full h-full transition-all hover:scale-110 active:scale-90" />
                  </Link>
                </div>

                {/* Github */}
                <div className="w-6 h-6 mt-2 mr-2">
                  <Link href={"https://github.com/"} title="GitHub Profile" target="_blank" rel="noopener noreferrer">
                    <BsGithub className="w-full h-full transition-all hover:scale-110 active:scale-90" />
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Resume Download Button */}
            <Link
              href={'/resume/cv.pdf'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2 transition-transform border border-gray-500 rounded-md outline-none select-none dark:border-gray-400 hover:bg-white dark:hover:bg-neutral-800 active:scale-95"
            >
              <FiDownload />
              <p>Resume</p>
            </Link>
          </div>
        </motion.section>
      </div>
    </>
  )
}

export function HomeHeading({ title }: { title: React.ReactNode | string }) {
  return (
    <AnimatedHeading
      className="w-full my-2 px-4 text-3xl font-bold text-left font-inter flex justify-center items-center"
      variants={headingFromLeft}
    >
      {title}
    </AnimatedHeading>
  )
}

export async function getStaticProps() {
  await getRSS()
  await generateSitemap()

  return {
    props: {},
  }
}
