import MDXContent from "@lib/MDXContent"
import pageMeta from "@content/meta"
import {
  PostType,
} from '@lib/types'
import StaticPage from "@components/StaticPage"
import { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import { FadeContainer } from "@content/FramerMotionVariants"
import Loader from '@components/Loader'
import NoData from "@components/NoData"
import { HomeHeading } from '../pages'
import AnimatedHeading from '@components/FramerMotion/AnimatedHeading'
import { headingFromLeft } from '@content/FramerMotionVariants'
import dynamic from 'next/dynamic'
import Experience from "@content/Experience"
import Skills from "@content/Skills"
import Educations from "@content/Education"

import Interest from "@content/Interest"

const SkillSection = dynamic(() => import('@components/Home/SkillSection'), {
  loading: () => <Loader />,
})

const ExperienceSection = dynamic(() => import('@components/Home/ExperienceSection'), {
  loading: () => <Loader />,
})

const Education = dynamic(() => import('@components/Education'), {
  loading: () => <Loader />,
})



const InterestSection = dynamic(() => import('@components/Interest'), {
  loading: () => <Loader />,
})


export default function About({
  about
}: {
  about: PostType
}) {

  // Loaders
  const [experiencesLoading, setExperiencesLoading] = useState(true)
  const [skillsLoading, setSkillsLoading] = useState(true)
  const [educationsLoading, setEducationsLoading] = useState(true)

  const [interestsLoading, setInterestsLoading] = useState(true)

  useEffect(() => {
    if(Experience.length) {
      setExperiencesLoading(false);
    }
    if (Skills.length) setSkillsLoading(false);
    if (Educations.length) setEducationsLoading(false);

    if (Interest.length) setInterestsLoading(false)
  }, [])

  return (
    <>
      <StaticPage metadata={pageMeta.about} page={about} />
      <div className="relative max-w-4xl mx-auto bg-darkWhitePrimary dark:bg-darkPrimary dark:text-gray-100 2xl:max-w-5xl 3xl:max-w-7xl">
        <motion.section
          initial="hidden"
          whileInView="visible"
          variants={FadeContainer}
          viewport={{ once: true }}
          className="grid min-h-screen py-7 place-content-center"
        >
          <div>
            {/* Experiences */}
            <AnimatedHeading
              className="w-full my-2 text-3xl font-bold text-left font-inter flex justify-center items-center"
              variants={headingFromLeft}
            >
              <span className="mr-2">Work Experiences</span>
              <span className="px-2 py-1 text-xs font-bold text-white bg-blue-500 rounded-full">
                {Experience.length}
              </span>
            </AnimatedHeading>
            {experiencesLoading ? (
              <Loader />
            ) : Experience.length > 0 ? (
              <ExperienceSection experiences={Experience} showHomeHeading={false} />
            ) : (
              <NoData />
            )}

            {/* Skills */}
            <HomeHeading title="Skills" />
            {skillsLoading ? (
              <Loader />
            ) : Skills.length > 0 ? (
              <SkillSection skills={Skills} showHomeHeading={false} />
            ) : (
              <NoData />
            )}

            {/* Educations */}
            <HomeHeading title="Educations" />
            {educationsLoading ? (
              <Loader />
            ) : Educations.length > 0 ? (
              <Education educations={Educations} showHomeHeading={false} />
            ) : (
              <NoData />
            )}



            {/* Interests */}
            <HomeHeading title="Interests" />
            {interestsLoading ? (
              <Loader />
            ) : Interest.length > 0 ? (
              <InterestSection interests={Interest} showHomeHeading={false} />
            ) : (
              <NoData />
            )}
          </div>
        </motion.section>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const { post: about } = await new MDXContent("static_pages").getPostFromSlug(
    "about"
  );
  return {
    props: {
      about
    },
  }
}
