import React from 'react'
import { SafeAreaView, View } from 'react-native'
import { ItemFilter, Text, Divider, Button, MultiSlider, ActionSheet } from '@components'
import { Global, Constants } from '@common'
import { connect } from 'react-redux'
import { ActionCreators } from '@actions'
import * as ActionTypes from '@actions/ActionTypes'
import { bindActionCreators } from 'redux'

import styles from './styles'

class Filter extends React.PureComponent {
  state = {
    minValue: Constants.MIN_PRICE,
    maxValue: Constants.MAX_PRICE,
    categories: [],
    category: null,
    tags: [],
    tag: null
  }

  render() {
    const { categories, category, tags, tag } = this.state
    const nameCategory = category ? category.name : __.t('None')
    const nameTag = tag ? tag.name : __.t('None')
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <View>
            <View style={styles.viewPadding}></View>
            <View style={styles.item}>
              <View style={styles.title}>
                <Text style={styles.textTitle}>{"Category"}</Text>
                <Divider />
              </View>
              <ItemFilter title={nameCategory} onPress={() => this.refs.categories.show()} />
            </View>
            <View style={styles.viewPadding}></View>
            <View style={styles.item}>
              <View style={styles.title}>
                <Text style={styles.textTitle}>{"Tags"}</Text>
                <Divider />
              </View>
              <ItemFilter title={nameTag} onPress={() => this.refs.tags.show()} />
            </View>
            <View style={styles.viewPadding}></View>
            <View style={styles.item}>
              <View style={styles.title}>
                <Text style={styles.textTitle}>{"Price rate"}</Text>
                <Divider />
              </View>
              <MultiSlider
                min={Constants.MIN_PRICE}
                max={Constants.MAX_PRICE}
                onValuesChange={(e) => this.changeSlider(e)}
                minValue={this.state.minValue}
                maxValue={this.state.maxValue} />
            </View>
          </View>
          <View style={styles.action}>
            <Button
              title={__.t('Apply')}
              onPress={this.onApply} />
          </View>
          <ActionSheet
            title={__.t("Categories")}
            ref='categories'
            itemKey={'name'}
            items={categories}
            onSelect={this.onSelectCategory} />
          <ActionSheet
            title={__.t("Tags")}
            ref='tags'
            itemKey={'name'}
            items={tags}
            onSelect={(tag) => this.setState({ tag })} />
        </View>
      </SafeAreaView>
    )
  }

  componentDidMount = () => {
    this.props.getCategories()
    this.props.getTags()
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.type == ActionTypes.GET_CATEGORIES_SUCCESS) {
      this.setState({ categories: nextProps.categories })
    }

    if (nextProps.typeTags === ActionTypes.GET_TAGS_SUCCESS) {
      this.setState({ tags: nextProps.tags })
    }

    if (nextProps.typeFilter === ActionTypes.APPLY_FILTER) {
      if (nextProps.dataFilter) {
        let data = nextProps.dataFilter
        const minValue = data.minValue ? data.minValue : Constants.MIN_PRICE
        const maxValue = data.maxValue ? data.maxValue : Constants.MAX_PRICE
        this.setState({ tag: data.tag, category: data.category, minValue, maxValue })
      }
    }
  }

  changeSlider = (data) => {
    this.setState({ minValue: data[0] ? data[0] : 0, maxValue: data[1] ? data[1] : 0 });
  }

  onSelectCategory = (category) => {
    this.setState({ category })
  }

  onApply = () => {
    const { minValue, maxValue, category, tag } = this.state;
    const param = {
      minValue,
      maxValue,
      categoryId: category ? category.id : null,
      tagId: tag ? tag.id : null
    };
    let dataFilter = {}
    dataFilter.tag = tag ? tag : null
    dataFilter.category = category ? category : null
    dataFilter.minValue = minValue
    dataFilter.maxValue = maxValue
    this.props.applyFilter(dataFilter)
    Global.EventEmitter.emit(Constants.EventEmitterName.onFilter, param);
    this.props.onSearch();
  }

}


function mapStateToProps({ categoriesReducers, tagsReducers, settingsReducers }) {
  return {
    type: categoriesReducers.type,
    categories: categoriesReducers.categories,
    typeTags: tagsReducers.type,
    tags: tagsReducers.tags,
    dataFilter: settingsReducers.filter,
    typeFilter: settingsReducers.type
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)