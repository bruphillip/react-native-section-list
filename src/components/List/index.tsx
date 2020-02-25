import React, {useState, useEffect, useRef} from 'react';
import {SectionList, FlatList, ViewToken} from 'react-native';
import produce from 'immer';
import sectionListGetItemLayout from 'react-native-section-list-get-item-layout';

import {User} from '../../index';
import {
  Container,
  ButtonArea,
  Button,
  ButtonText,
  SectionHeader,
  SectionText,
  ItemContainer,
  ItemText,
} from './styles';

interface Props {
  users: User[];
}

const getItemLayout = sectionListGetItemLayout({
  // The height of the row with rowData at the given sectionIndex and rowIndex
  getItemHeight: (rowData, sectionIndex, rowIndex) => 50,

  // These four properties are optional
  getSectionHeaderHeight: () => 50, // The height of your section headers
  getSectionFooterHeight: () => 0, // The height of your section footers
  listHeaderHeight: 0, // The height of your list header
});

export default function List({users}: Props) {
  const [sections, setSections] = useState([]);
  const [currentSection, setCurrentSection] = useState({title: ''});
  const sectionRef = useRef();
  const scrollViewRef = useRef();

  useEffect(() => {
    setSections(
      produce(users, draft => {
        return draft.map((user: any) => ({title: user.name, data: user.repos}));
      }),
    );
  }, [users]);

  function onViewableItemsChanged(event: {
    viewableItems: Array<ViewToken>;
    changed: Array<ViewToken>;
  }) {
    const {item} = event.changed[0];
    if (!item || sections.length === 0) return;

    console.log(item);
    if (currentSection.title !== item.title) {
      setCurrentSection(item);
      const index = sections.findIndex(section => section.title === item.title);
      if (index === -1) return;
      console.log(index);
      scrollViewRef.current.scrollToIndex({animated: true, index: index});
    }

    // e.viewableItems.map(
    //   item =>
    //     item.index === null &&
    //     console.log(
    //       sections.findIndex(
    //         section => section.title === item.section.title,
    //       ),
    //     ),
    //   // scrollViewRef.current.scrollToIndex({animated: true, index: 3}),
    // )
  }

  return (
    <Container>
      <ButtonArea>
        <FlatList
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={sections}
          renderItem={({item: section, index}) => (
            <Button
              onPress={() =>
                sectionRef.current.scrollToLocation({
                  sectionIndex: index,
                  itemIndex: 0,
                  animated: true,
                  viewPosition: 0,
                })
              }>
              <ButtonText>
                {section.title} - {section.data.length}
              </ButtonText>
            </Button>
          )}
        />
      </ButtonArea>

      <SectionList
        onViewableItemsChanged={onViewableItemsChanged}
        ref={sectionRef}
        getItemLayout={(data: any, index) => getItemLayout(data, index)}
        sections={sections}
        renderSectionHeader={({section}) => (
          <SectionHeader>
            <SectionText>{section.title}</SectionText>
          </SectionHeader>
        )}
        renderItem={({item}) => (
          <ItemContainer>
            <ItemText>{item.name}</ItemText>
          </ItemContainer>
        )}
      />
    </Container>
  );
}
