import React, { useState } from 'react';
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function TutoringScreen() {
  const [selectedSubject, setSelectedSubject] = useState('');

  const subjects = [
    { id: 'math', name: 'Mathematics', icon: '🔢', available: 12 },
    { id: 'science', name: 'Science', icon: '🔬', available: 8 },
    { id: 'english', name: 'English', icon: '📝', available: 15 },
    { id: 'history', name: 'History', icon: '📚', available: 6 },
    { id: 'geography', name: 'Geography', icon: '🌍', available: 4 },
    { id: 'chemistry', name: 'Chemistry', icon: '⚗️', available: 7 },
  ];

  const tutors = [
    {
      id: 1,
      name: 'Dr. Sarah Mukamuri',
      subject: 'Mathematics',
      rating: 4.9,
      experience: '8 years',
      price: '$15/hour',
      availability: 'Available now',
      specialties: ['Algebra', 'Calculus', 'Geometry'],
      students: 234,
    },
    {
      id: 2,
      name: 'Prof. James Chimbindi',
      subject: 'Science',
      rating: 4.8,
      experience: '12 years',
      price: '$18/hour',
      availability: 'Available in 30 min',
      specialties: ['Physics', 'Biology', 'Chemistry'],
      students: 189,
    },
    {
      id: 3,
      name: 'Ms. Grace Moyo',
      subject: 'English',
      rating: 4.9,
      experience: '6 years',
      price: '$12/hour',
      availability: 'Available now',
      specialties: ['Literature', 'Grammar', 'Writing'],
      students: 156,
    },
  ];

  const upcomingSessions = [
    {
      id: 1,
      tutor: 'Dr. Sarah Mukamuri',
      subject: 'Mathematics',
      topic: 'Quadratic Equations',
      time: 'Today, 3:00 PM',
      duration: '1 hour',
    },
    {
      id: 2,
      tutor: 'Prof. James Chimbindi',
      subject: 'Physics',
      topic: 'Motion and Forces',
      time: 'Tomorrow, 10:00 AM',
      duration: '45 minutes',
    },
  ];

  const handleBookSession = (tutor: any) => {
    Alert.alert(
      'Book Session',
      `Book a tutoring session with ${tutor.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Book Now', onPress: () => Alert.alert('Success', 'Session booked successfully!') },
      ]
    );
  };

  const handleQuickHelp = () => {
    Alert.alert('Quick Help', 'Connecting you with an available tutor...');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Online Tutoring</Text>
        <Text style={styles.headerSubtitle}>Get expert help when you need it</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        {/* Quick Help Button */}
        <TouchableOpacity style={styles.quickHelpButton} onPress={handleQuickHelp}>
          <Text style={styles.quickHelpIcon}>⚡</Text>
          <View style={styles.quickHelpInfo}>
            <Text style={styles.quickHelpTitle}>Need Help Right Now?</Text>
            <Text style={styles.quickHelpSubtitle}>Get instant help from available tutors</Text>
          </View>
          <Text style={styles.quickHelpArrow}>→</Text>
        </TouchableOpacity>

        {/* Upcoming Sessions */}
        {upcomingSessions.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Upcoming Sessions</Text>
            {upcomingSessions.map((session) => (
              <View key={session.id} style={styles.sessionCard}>
                <View style={styles.sessionInfo}>
                  <Text style={styles.sessionSubject}>{session.subject}</Text>
                  <Text style={styles.sessionTopic}>{session.topic}</Text>
                  <Text style={styles.sessionTutor}>with {session.tutor}</Text>
                  <Text style={styles.sessionTime}>{session.time} • {session.duration}</Text>
                </View>
                <TouchableOpacity style={styles.joinButton}>
                  <Text style={styles.joinButtonText}>Join</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* Subject Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choose Subject</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.subjectsContainer}>
            {subjects.map((subject) => (
              <TouchableOpacity
                key={subject.id}
                style={[
                  styles.subjectCard,
                  selectedSubject === subject.id && styles.subjectCardActive
                ]}
                onPress={() => setSelectedSubject(subject.id)}
              >
                <Text style={styles.subjectIcon}>{subject.icon}</Text>
                <Text style={[
                  styles.subjectName,
                  selectedSubject === subject.id && styles.subjectNameActive
                ]}>
                  {subject.name}
                </Text>
                <Text style={[
                  styles.subjectAvailable,
                  selectedSubject === subject.id && styles.subjectAvailableActive
                ]}>
                  {subject.available} tutors
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Available Tutors */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Tutors</Text>
          {tutors.map((tutor) => (
            <View key={tutor.id} style={styles.tutorCard}>
              <View style={styles.tutorHeader}>
                <View style={styles.tutorAvatar}>
                  <Text style={styles.tutorInitial}>{tutor.name[0]}</Text>
                </View>
                <View style={styles.tutorInfo}>
                  <Text style={styles.tutorName}>{tutor.name}</Text>
                  <Text style={styles.tutorSubject}>{tutor.subject} Specialist</Text>
                  <View style={styles.tutorMeta}>
                    <Text style={styles.tutorRating}>⭐ {tutor.rating}</Text>
                    <Text style={styles.tutorExperience}>{tutor.experience}</Text>
                    <Text style={styles.tutorStudents}>{tutor.students} students</Text>
                  </View>
                </View>
                <View style={styles.tutorPricing}>
                  <Text style={styles.tutorPrice}>{tutor.price}</Text>
                  <Text style={styles.tutorAvailability}>{tutor.availability}</Text>
                </View>
              </View>

              <View style={styles.tutorSpecialties}>
                {tutor.specialties.map((specialty, index) => (
                  <View key={index} style={styles.specialtyTag}>
                    <Text style={styles.specialtyText}>{specialty}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.tutorActions}>
                <TouchableOpacity style={styles.messageButton}>
                  <Text style={styles.messageButtonText}>Message</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.bookButton}
                  onPress={() => handleBookSession(tutor)}
                >
                  <Text style={styles.bookButtonText}>Book Session</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
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
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  quickHelpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#5D5CDE',
    margin: 20,
    padding: 20,
    borderRadius: 12,
  },
  quickHelpIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  quickHelpInfo: {
    flex: 1,
  },
  quickHelpTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  quickHelpSubtitle: {
    fontSize: 14,
    color: '#e2e8f0',
    marginTop: 4,
  },
  quickHelpArrow: {
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
    flexDirection: 'row',
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
  sessionInfo: {
    flex: 1,
  },
  sessionSubject: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  sessionTopic: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 2,
  },
  sessionTutor: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
  },
  sessionTime: {
    fontSize: 12,
    color: '#5D5CDE',
    marginTop: 4,
  },
  joinButton: {
    backgroundColor: '#10B981',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'center',
  },
  joinButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  subjectsContainer: {
    paddingBottom: 10,
  },
  subjectCard: {
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginRight: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    minWidth: 100,
  },
  subjectCardActive: {
    backgroundColor: '#5D5CDE',
    borderColor: '#5D5CDE',
  },
  subjectIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  subjectName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    textAlign: 'center',
  },
  subjectNameActive: {
    color: '#fff',
  },
  subjectAvailable: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
  },
  subjectAvailableActive: {
    color: '#e2e8f0',
  },
  tutorCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tutorHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  tutorAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#5D5CDE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  tutorInitial: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  tutorInfo: {
    flex: 1,
  },
  tutorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  tutorSubject: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 2,
  },
  tutorMeta: {
    flexDirection: 'row',
    marginTop: 4,
  },
  tutorRating: {
    fontSize: 12,
    color: '#64748b',
    marginRight: 12,
  },
  tutorExperience: {
    fontSize: 12,
    color: '#64748b',
    marginRight: 12,
  },
  tutorStudents: {
    fontSize: 12,
    color: '#64748b',
  },
  tutorPricing: {
    alignItems: 'flex-end',
  },
  tutorPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10B981',
  },
  tutorAvailability: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  tutorSpecialties: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  specialtyTag: {
    backgroundColor: '#f1f5f9',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    marginRight: 8,
    marginBottom: 4,
  },
  specialtyText: {
    fontSize: 12,
    color: '#64748b',
  },
  tutorActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  messageButton: {
    flex: 1,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#5D5CDE',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 8,
  },
  messageButtonText: {
    color: '#5D5CDE',
    fontSize: 14,
    fontWeight: '600',
  },
  bookButton: {
    flex: 1,
    backgroundColor: '#5D5CDE',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 8,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});