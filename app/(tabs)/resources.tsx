import React, { useState } from 'react';
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function ResourcesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All', icon: '📚' },
    { id: 'textbooks', name: 'Textbooks', icon: '📖' },
    { id: 'videos', name: 'Videos', icon: '🎥' },
    { id: 'quizzes', name: 'Quizzes', icon: '❓' },
    { id: 'worksheets', name: 'Worksheets', icon: '📄' },
  ];

  const resources = [
    {
      id: 1,
      title: 'Grade 7 Mathematics Textbook',
      type: 'textbook',
      subject: 'Mathematics',
      grade: 'Grade 7',
      downloads: 1240,
      rating: 4.8,
      size: '15.2 MB',
    },
    {
      id: 2,
      title: 'O-Level Physics Video Series',
      type: 'video',
      subject: 'Physics',
      grade: 'O-Level',
      downloads: 890,
      rating: 4.9,
      duration: '12 hours',
    },
    {
      id: 3,
      title: 'English Grammar Quiz Pack',
      type: 'quiz',
      subject: 'English',
      grade: 'All Levels',
      downloads: 2100,
      rating: 4.7,
      questions: '150 questions',
    },
    {
      id: 4,
      title: 'A-Level Chemistry Worksheets',
      type: 'worksheet',
      subject: 'Chemistry',
      grade: 'A-Level',
      downloads: 567,
      rating: 4.6,
      pages: '45 pages',
    },
  ];

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'textbook': return '📖';
      case 'video': return '🎥';
      case 'quiz': return '❓';
      case 'worksheet': return '📄';
      default: return '📚';
    }
  };

  const handleDownload = (resource: any) => {
    Alert.alert(
      'Download Resource',
      `Download "${resource.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Download', onPress: () => Alert.alert('Success', 'Download started!') },
      ]
    );
  };

  const filteredResources = resources.filter(resource => 
    (selectedCategory === 'all' || resource.type === selectedCategory) &&
    resource.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Resource Library</Text>
        <Text style={styles.headerSubtitle}>Access quality educational content</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search resources..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Categories */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryCard,
              selectedCategory === category.id && styles.categoryCardActive
            ]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <Text style={styles.categoryIcon}>{category.icon}</Text>
            <Text style={[
              styles.categoryName,
              selectedCategory === category.id && styles.categoryNameActive
            ]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Resources List */}
      <ScrollView style={styles.resourcesList} contentContainerStyle={styles.resourcesContent}>
        {filteredResources.map((resource) => (
          <View key={resource.id} style={styles.resourceCard}>
            <View style={styles.resourceHeader}>
              <Text style={styles.resourceIcon}>{getResourceIcon(resource.type)}</Text>
              <View style={styles.resourceInfo}>
                <Text style={styles.resourceTitle}>{resource.title}</Text>
                <Text style={styles.resourceMeta}>
                  {resource.subject} • {resource.grade}
                </Text>
              </View>
            </View>

            <View style={styles.resourceDetails}>
              <View style={styles.resourceStats}>
                <Text style={styles.statText}>⭐ {resource.rating}</Text>
                <Text style={styles.statText}>⬇️ {resource.downloads}</Text>
                <Text style={styles.statText}>
                  {resource.size || resource.duration || resource.questions || resource.pages}
                </Text>
              </View>

              <TouchableOpacity 
                style={styles.downloadButton}
                onPress={() => handleDownload(resource)}
              >
                <Text style={styles.downloadButtonText}>Download</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {filteredResources.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No resources found</Text>
            <Text style={styles.emptyStateSubtext}>Try adjusting your search or category filter</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#64748b',
    marginTop: 4,
  },
  searchContainer: {
    padding: 20,
    backgroundColor: '#fff',
  },
  searchInput: {
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  categoriesContainer: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  categoryCard: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 12,
    borderRadius: 12,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  categoryCardActive: {
    backgroundColor: '#5D5CDE',
    borderColor: '#5D5CDE',
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  categoryName: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748b',
  },
  categoryNameActive: {
    color: '#fff',
  },
  resourcesList: {
    flex: 1,
  },
  resourcesContent: {
    padding: 20,
    paddingBottom: 100,
  },
  resourceCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    boxShadowColor: '#000',
    boxShadowOffset: { width: 0, height: 2 },
    boxShadowOpacity: 0.1,
    boxShadowRadius: 4,
    elevation: 3,
  },
  resourceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  resourceIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  resourceInfo: {
    flex: 1,
  },
  resourceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  resourceMeta: {
    fontSize: 14,
    color: '#64748b',
  },
  resourceDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resourceStats: {
    flexDirection: 'row',
    flex: 1,
  },
  statText: {
    fontSize: 12,
    color: '#64748b',
    marginRight: 16,
  },
  downloadButton: {
    backgroundColor: '#5D5CDE',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  downloadButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#64748b',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
  },
});