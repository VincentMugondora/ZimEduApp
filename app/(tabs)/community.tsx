import React, { useState } from 'react';
import {
    Alert,
    Modal,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

interface Discussion {
  id: number;
  title: string;
  author: string;
  category: string;
  replies: number;
  lastReply: string;
  isHot: boolean;
  isPinned: boolean;
  tags: string[];
}

interface ExpertSession {
  id: number;
  expert: string;
  title: string;
  subject: string;
  time: string;
  participants: number;
  status: 'upcoming' | 'live' | 'ended';
}

export default function CommunityScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAskModal, setShowAskModal] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');
  const [questionCategory, setQuestionCategory] = useState('general');

  const categories = [
    { id: 'all', name: 'All', icon: '💬', color: '#64748b' },
    { id: 'homework', name: 'Homework Help', icon: '📝', color: '#3B82F6' },
    { id: 'study-tips', name: 'Study Tips', icon: '💡', color: '#10B981' },
    { id: 'exams', name: 'Exam Prep', icon: '📊', color: '#F59E0B' },
    { id: 'career', name: 'Career Advice', icon: '🎯', color: '#8B5CF6' },
    { id: 'parents', name: 'Parent Corner', icon: '👨‍👩‍👧‍👦', color: '#EF4444' },
  ];

  const discussions: Discussion[] = [
    {
      id: 1,
      title: 'How to solve quadratic equations effectively?',
      author: 'StudentMath2024',
      category: 'homework',
      replies: 23,
      lastReply: '2 hours ago',
      isHot: true,
      isPinned: false,
      tags: ['mathematics', 'algebra', 'grade10'],
    },
    {
      id: 2,
      title: 'Best study techniques for O-Level Sciences',
      author: 'ScienceLover',
      category: 'study-tips',
      replies: 45,
      lastReply: '1 hour ago',
      isHot: true,
      isPinned: true,
      tags: ['study-tips', 'science', 'o-level'],
    },
    {
      id: 3,
      title: 'Chemistry practicals - Common mistakes to avoid',
      author: 'ChemExpert',
      category: 'exams',
      replies: 12,
      lastReply: '3 hours ago',
      isHot: false,
      isPinned: false,
      tags: ['chemistry', 'practicals', 'tips'],
    },
    {
      id: 4,
      title: 'How to motivate teenagers to study at home?',
      author: 'ConcernedParent',
      category: 'parents',
      replies: 34,
      lastReply: '30 minutes ago',
      isHot: true,
      isPinned: false,
      tags: ['parenting', 'motivation', 'home-study'],
    },
    {
      id: 5,
      title: 'University application tips for Zimbabwe students',
      author: 'CareerGuidance',
      category: 'career',
      replies: 67,
      lastReply: '4 hours ago',
      isHot: false,
      isPinned: true,
      tags: ['university', 'applications', 'career'],
    },
  ];

  const expertSessions: ExpertSession[] = [
    {
      id: 1,
      expert: 'Dr. Margaret Sibanda',
      title: 'Advanced Mathematics Q&A Session',
      subject: 'Mathematics',
      time: 'Today, 4:00 PM',
      participants: 45,
      status: 'upcoming',
    },
    {
      id: 2,
      expert: 'Prof. David Mpofu',
      title: 'Career Guidance Workshop',
      subject: 'Career Development',
      time: 'Tomorrow, 10:00 AM',
      participants: 78,
      status: 'upcoming',
    },
    {
      id: 3,
      expert: 'Ms. Grace Mutasa',
      title: 'English Literature Discussion',
      subject: 'English',
      time: 'Live Now',
      participants: 23,
      status: 'live',
    },
  ];

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.color : '#64748b';
  };

  const handleAskQuestion = () => {
    if (!newQuestion.trim()) {
      Alert.alert('Error', 'Please enter your question');
      return;
    }
    
    Alert.alert('Success', 'Your question has been posted to the community!');
    setNewQuestion('');
    setShowAskModal(false);
  };

  const handleJoinSession = (session: ExpertSession) => {
    if (session.status === 'live') {
      Alert.alert('Join Session', `Joining "${session.title}" with ${session.expert}`);
    } else {
      Alert.alert('Set Reminder', `Reminder set for "${session.title}"`);
    }
  };

  const filteredDiscussions = selectedCategory === 'all' 
    ? discussions 
    : discussions.filter(d => d.category === selectedCategory);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Community</Text>
        <Text style={styles.headerSubtitle}>Connect, learn, and grow together</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        {/* Community Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>2.4K</Text>
            <Text style={styles.statLabel}>Active Members</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>145</Text>
            <Text style={styles.statLabel}>Discussions Today</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>89</Text>
            <Text style={styles.statLabel}>Questions Answered</Text>
          </View>
        </View>

        {/* Ask Question Button */}
        <TouchableOpacity 
          style={styles.askButton}
          onPress={() => setShowAskModal(true)}
        >
          <Text style={styles.askButtonIcon}>❓</Text>
          <View style={styles.askButtonInfo}>
            <Text style={styles.askButtonTitle}>Ask a Question</Text>
            <Text style={styles.askButtonSubtitle}>Get help from the community</Text>
          </View>
          <Text style={styles.askButtonArrow}>→</Text>
        </TouchableOpacity>

        {/* Expert Sessions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Expert Sessions</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {expertSessions.map((session) => (
              <View key={session.id} style={styles.sessionCard}>
                <View style={styles.sessionHeader}>
                  <View style={[
                    styles.sessionStatus,
                    { backgroundColor: session.status === 'live' ? '#EF4444' : 
                                     session.status === 'upcoming' ? '#10B981' : '#64748b' }
                  ]}>
                    <Text style={styles.sessionStatusText}>
                      {session.status === 'live' ? 'LIVE' : 
                       session.status === 'upcoming' ? 'UPCOMING' : 'ENDED'}
                    </Text>
                  </View>
                  <Text style={styles.sessionParticipants}>👥 {session.participants}</Text>
                </View>
                
                <Text style={styles.sessionTitle}>{session.title}</Text>
                <Text style={styles.sessionExpert}>by {session.expert}</Text>
                <Text style={styles.sessionSubject}>{session.subject}</Text>
                <Text style={styles.sessionTime}>{session.time}</Text>
                
                <TouchableOpacity 
                  style={[
                    styles.sessionButton,
                    { backgroundColor: session.status === 'live' ? '#EF4444' : '#5D5CDE' }
                  ]}
                  onPress={() => handleJoinSession(session)}
                >
                  <Text style={styles.sessionButtonText}>
                    {session.status === 'live' ? 'Join Now' : 'Set Reminder'}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Discussion Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Discussion Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryCard,
                  selectedCategory === category.id && { backgroundColor: category.color }
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
        </View>

        {/* Discussions List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Discussions</Text>
          {filteredDiscussions.map((discussion) => (
            <TouchableOpacity key={discussion.id} style={styles.discussionCard}>
              <View style={styles.discussionHeader}>
                <View style={styles.discussionMeta}>
                  {discussion.isPinned && (
                    <Text style={styles.pinnedIcon}>📌</Text>
                  )}
                  {discussion.isHot && (
                    <Text style={styles.hotIcon}>🔥</Text>
                  )}
                  <View style={[
                    styles.categoryBadge,
                    { backgroundColor: getCategoryColor(discussion.category) }
                  ]}>
                    <Text style={styles.categoryBadgeText}>
                      {categories.find(cat => cat.id === discussion.category)?.name}
                    </Text>
                  </View>
                </View>
                <Text style={styles.discussionReplies}>{discussion.replies} replies</Text>
              </View>
              
              <Text style={styles.discussionTitle}>{discussion.title}</Text>
              
              <View style={styles.discussionTags}>
                {discussion.tags.map((tag, index) => (
                  <View key={index} style={styles.tag}>
                    <Text style={styles.tagText}>#{tag}</Text>
                  </View>
                ))}
              </View>
              
              <View style={styles.discussionFooter}>
                <Text style={styles.discussionAuthor}>by {discussion.author}</Text>
                <Text style={styles.discussionTime}>Last reply: {discussion.lastReply}</Text>
              </View>
            </TouchableOpacity>
          ))}

          {filteredDiscussions.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No discussions found</Text>
              <Text style={styles.emptyStateSubtext}>Be the first to start a discussion in this category!</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Ask Question Modal */}
      <Modal
        visible={showAskModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowAskModal(false)}>
              <Text style={styles.modalCancel}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Ask Question</Text>
            <TouchableOpacity onPress={handleAskQuestion}>
              <Text style={styles.modalPost}>Post</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.modalContent}>
            <Text style={styles.inputLabel}>Category</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.modalCategories}>
              {categories.slice(1).map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.modalCategoryCard,
                    questionCategory === category.id && { backgroundColor: category.color }
                  ]}
                  onPress={() => setQuestionCategory(category.id)}
                >
                  <Text style={styles.modalCategoryIcon}>{category.icon}</Text>
                  <Text style={[
                    styles.modalCategoryName,
                    questionCategory === category.id && styles.modalCategoryNameActive
                  ]}>
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            
            <Text style={styles.inputLabel}>Your Question</Text>
            <TextInput
              style={styles.questionInput}
              placeholder="Describe your question in detail..."
              value={newQuestion}
              onChangeText={setNewQuestion}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
            
            <Text style={styles.inputHint}>
              💡 Tip: Be specific and include details like your grade level and subject
            </Text>
          </View>
        </SafeAreaView>
      </Modal>
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
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: '#fff',
  },
  statCard: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5D5CDE',
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
  },
  askButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10B981',
    margin: 20,
    padding: 20,
    borderRadius: 12,
  },
  askButtonIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  askButtonInfo: {
    flex: 1,
  },
  askButtonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  askButtonSubtitle: {
    fontSize: 14,
    color: '#e2e8f0',
    marginTop: 4,
  },
  askButtonArrow: {
    fontSize: 24,
    color: '#fff',
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  sessionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginRight: 16,
    width: 280,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sessionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sessionStatus: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  sessionStatusText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  sessionParticipants: {
    fontSize: 12,
    color: '#64748b',
  },
  sessionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  sessionExpert: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  sessionSubject: {
    fontSize: 12,
    color: '#5D5CDE',
    marginBottom: 8,
  },
  sessionTime: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 16,
  },
  sessionButton: {
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  sessionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  categoriesContainer: {
    paddingBottom: 10,
  },
  categoryCard: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 12,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    minWidth: 80,
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  categoryName: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748b',
    textAlign: 'center',
  },
  categoryNameActive: {
    color: '#fff',
  },
  discussionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  discussionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  discussionMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pinnedIcon: {
    fontSize: 14,
    marginRight: 8,
  },
  hotIcon: {
    fontSize: 14,
    marginRight: 8,
  },
  categoryBadge: {
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
  },
  categoryBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '500',
  },
  discussionReplies: {
    fontSize: 12,
    color: '#64748b',
  },
  discussionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
    lineHeight: 22,
  },
  discussionTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  tag: {
    backgroundColor: '#f1f5f9',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
    marginRight: 6,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 10,
    color: '#64748b',
  },
  discussionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  discussionAuthor: {
    fontSize: 12,
    color: '#64748b',
  },
  discussionTime: {
    fontSize: 12,
    color: '#64748b',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#64748b',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  modalCancel: {
    fontSize: 16,
    color: '#64748b',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  modalPost: {
    fontSize: 16,
    color: '#5D5CDE',
    fontWeight: '600',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 12,
  },
  modalCategories: {
    marginBottom: 24,
  },
  modalCategoryCard: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 12,
    borderRadius: 8,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  modalCategoryIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  modalCategoryName: {
    fontSize: 12,
    color: '#64748b',
  },
  modalCategoryNameActive: {
    color: '#fff',
  },
  questionInput: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#f8fafc',
    minHeight: 120,
    marginBottom: 12,
  },
  inputHint: {
    fontSize: 14,
    color: '#64748b',
    fontStyle: 'italic',
  },
});