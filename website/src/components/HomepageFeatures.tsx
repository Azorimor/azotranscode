import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

type FeatureItem = {
  title: string;
  image: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Multiple Video Formats',
    image: '/azotranscode/img/undraw/undraw_video_files.svg',
    description: (
      <>
        Azotranscode can transform any given video file to any other format. HLS and MPEG Dash are also supported.
      </>
    ),
  },
  {
    title: 'Playable on any device',
    image: '/azotranscode/img/undraw/undraw_video_influencer.svg',
    description: (
      <>
        Azotranscode can generate video files, which are optimized for specific devices and potentially reduce network traffic.
      </>
    ),
  },
  {
    title: 'Easy to use',
    image: '/azotranscode/img/undraw/undraw_online_media.svg',
    description: (
      <>
        Azotranscode uses pre defined jobs to get started quickly. Additionally every step in the toolchain can be customized.
      </>
    ),
  },
];

function Feature({title, image, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img className={styles.featureSvg} alt={title} src={image} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
