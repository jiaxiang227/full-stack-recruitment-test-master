import React from 'react';
import BpkText from 'bpk-component-text';
import BpkPanel from 'bpk-component-panel';
import { BpkGridContainer, BpkGridRow, BpkGridColumn } from 'bpk-component-grid';
import BpkButton from 'bpk-component-button';
import LongArrowRightIcon from 'bpk-component-icon/lg/long-arrow-right';
// eslint-disable-next-line import/no-extraneous-dependencies
import { lineHeightLg, iconSizeLg, colors } from 'bpk-tokens/tokens/base.es6';
import { withAlignment } from 'bpk-component-icon';
import Moment from 'react-moment';
import flights from '../../data/flights.json';

import STYLES from './App.scss';
import Header from './../Header';

const getClassName = className => STYLES[className] || 'UNKNOWN';
const AlignedArrow = withAlignment(
  LongArrowRightIcon, lineHeightLg, iconSizeLg,
);

const headBanner = (
  <div className={getClassName('App__header')}>
    <BpkGridContainer>
      <BpkGridRow>
        <BpkText className={getClassName('App__header-location-row')}>
          <h1 className={getClassName('App__header-location-row')}>
            BUD
            <AlignedArrow fill={colors.colorWhite} />
            LON
          </h1>
        </BpkText>
      </BpkGridRow>
      <BpkGridRow>
        <BpkText>
          2 travellers, economy
        </BpkText>
      </BpkGridRow>
    </BpkGridContainer>
  </div>
);


const itineraryPanel = (itineraryInfo) => {
  const legsArray = flights.legs.filter(leg => itineraryInfo.legs.includes(leg.id));
  const legDetail = (detail) => {
    const airlineLogo = `https://logos.skyscnr.com/images/airlines/favicon/${detail.airline_id}.png`;
    return (
      <BpkGridContainer key={detail.id}>
        <BpkGridRow>
          <BpkGridColumn width={1} className={getClassName('App__panel-grid-col')}>
            <img src={airlineLogo} alt="" className={getClassName('App__panel-img')} />
          </BpkGridColumn>
          <BpkGridColumn width={7} className={getClassName('App__panel-grid-col')}>
            <BpkGridRow className={getClassName('App__panel-grid-col')}>
              <BpkGridColumn width={2} className={getClassName('App__itinerary-center')}>
                <BpkGridRow>
                  <Moment format="HH:mm">
                    {detail.departure_time}
                  </Moment>
                </BpkGridRow>
                <BpkGridRow>
                  <BpkText>
                    {detail.departure_airport}
                  </BpkText>
                </BpkGridRow>
              </BpkGridColumn>
              <BpkGridColumn width={3} className={getClassName('App__itinerary-center')}>
                <BpkText textStyle="base">
                  <AlignedArrow fill={colors.colorGray300} />
                </BpkText>
              </BpkGridColumn>
              <BpkGridColumn width={7} className={getClassName('App__itinerary-left')}>
                <BpkGridRow>
                  <Moment format="HH:mm">
                    {detail.arrival_time}
                  </Moment>
                </BpkGridRow>
                <BpkGridRow>
                  {detail.arrival_airport}
                </BpkGridRow>
              </BpkGridColumn>
            </BpkGridRow>
          </BpkGridColumn>
          <BpkGridColumn width={4} className={getClassName('App__itinerary-right')}>
            <BpkGridRow>
              <div>{Math.floor(detail.duration_mins / 60)}H {detail.duration_mins % 60}</div>
            </BpkGridRow>
            <BpkGridRow>
              {detail.stops ? (<div className={getClassName('App__text-red')}>{detail.stops} + stops</div>) : (<div className={getClassName('App__text-green')}>Direct</div>)}
            </BpkGridRow>
          </BpkGridColumn>
        </BpkGridRow>
      </BpkGridContainer>
    );
  };
  const agentDetail = (
    <BpkGridContainer>
      <BpkGridRow>
        <BpkGridColumn width={6} className={getClassName('App__panel-grid-agent')}>
          <BpkGridRow>
            <h1 className={getClassName('App__header-location-row')}>{itineraryInfo.price}</h1>
          </BpkGridRow>
          <BpkGridRow>
            {itineraryInfo.agent}
          </BpkGridRow>
        </BpkGridColumn>
        <BpkGridColumn width={6} className={getClassName('App__panel-button-col')}>
          <BpkGridRow className={getClassName('App__panel-button-row')}>
            <BpkButton className={getClassName('App__button-right')}>Select</BpkButton>
          </BpkGridRow>
        </BpkGridColumn>
      </BpkGridRow>
    </BpkGridContainer>
  );
  return (
    <BpkPanel className={getClassName('App__panel')} key={itineraryInfo.id}>
      {legsArray.map(detail => legDetail(detail))}
      {agentDetail}
    </BpkPanel>
  );
};


const App = () => (
  <div className={getClassName('App')}>
    <Header />
    <main className={getClassName('App__main')}>
      {/* TODO: Add an information blue header component here */}
      {headBanner}
      {/* TODO: Add a component to display results here */}
      {/* eslint-disable-next-line radix,max-len */}
      {flights.itineraries.sort(((a, b) => (parseInt(a.price.substring(1)) - parseInt(b.price.substring(1))))).map(info => itineraryPanel(info))}
    </main>
  </div>
);

export default App;
