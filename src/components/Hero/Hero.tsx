import React, { useContext } from 'react';
import {
  GlobalDispatchContext,
  Actions,
} from '../../context/GlobalContextProvider';
import MarkdownLinkContainer from '../MarkdownLinkContainer';

// Can't be bothered to fix this right now, so:
// @ts-ignore
import classes from './Hero.module.scss';

const Hero = ({
  logo,
  pretitle,
  subtitle,
  subtitleEmphasis,
  codeLinks,
  musicLinks,
}) => {
  const dispatch = useContext(GlobalDispatchContext);

  const addSubtitleEmphasis = text => {
    const words = [];
    let word = '';

    // Loop through text in the subtitle
    for (let i = 0; i < text.length; i++) {
      let char = text.charAt(i);

      // If punctuation, process previous word
      if (char === ' ' || char === ',' || char === '.') {
        words.push(word);
        words.push(char);
        word = '';
      } else {
        word += char;
      }
    }

    let isPrimaryEmphasis = true;
    for (const i in subtitleEmphasis) {
      const emphasis = subtitleEmphasis[i];
      const index = words.indexOf(emphasis.word);

      if (index >= 0) {
        if (isPrimaryEmphasis) {
          words[index] = (
            <span
              className={`${classes.heroEmphasis} ${classes.heroEmphasisBlue}`}
              onClick={() => dispatch({ type: Actions.SetSiteFocusToCode })}
            >
              {emphasis.word}
            </span>
          );
        } else {
          words[index] = (
            <span
              className={`${classes.heroEmphasis} ${classes.heroEmphasisGreen}`}
              onClick={() => dispatch({ type: Actions.SetSiteFocusToMusic })}
            >
              {emphasis.word}
            </span>
          );
        }
        isPrimaryEmphasis = !isPrimaryEmphasis;
      }
    }

    return words;
  };

  return (
    <div className={classes.hero}>
      <div className={classes.container}>
        <div className={classes.textContainer}>
          <h3 className={classes.heroPretitle}>{pretitle}</h3>
          <img src={logo} alt='Henry Fellerhoff' className={classes.heroLogo} />
          <h3 className={classes.heroSubtitle}>
            {addSubtitleEmphasis(subtitle)}
          </h3>
        </div>
        <div className={classes.navigationContainer}>
          <div className={classes.navigationContainerTop}>
            <span
              className={`${classes.navigationContainerTopCircle} ${classes.navigationContainerTopCircleOne}`}
            ></span>
            <span
              className={`${classes.navigationContainerTopCircle} ${classes.navigationContainerTopCircleTwo}`}
            ></span>
            <span
              className={`${classes.navigationContainerTopCircle} ${classes.navigationContainerTopCircleThree}`}
            ></span>
          </div>
          <MarkdownLinkContainer
            className={classes.linkContainer}
            codeLinks={codeLinks}
            musicLinks={musicLinks}
            codeClassName={`${classes.link} ${classes.linkBlue}`}
            musicClassName={`${classes.link} ${classes.linkGreen}`}
            showLongText
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;

{
  /* <div className={classes.heroScrollContainer}>
        <img
          className={classes.heroScrollImage}
          src={mouseScrolldown}
          alt='Scroll down to'
        />
        Explore
      </div> */
}
