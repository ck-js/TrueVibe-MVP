



<template>
    <div>
      <h2>Your Matches</h2>
      <ul v-if="matches.length > 0">
        <li v-for="match in matches" :key="match.id">
          {{ match.name }} (Score: {{ match.score }}) - WhatsApp: {{ match.whatsapp_number }}
        </li>
      </ul>
      <p v-else>No matches found.</p>
    </div>
  </template>
  
  <script>
  import useSupabase from '@/composables/UseSupabase';

const { supabase } = useSupabase();
  
  export default {
    data() {
      return {
        matches: [],
        currentUserScore: null,
      };
    },
    async mounted() {
      await this.fetchCurrentUserScore();
      await this.fetchMatches();
      this.subscribeToMatches();
    },
    methods: {
      async fetchCurrentUserScore() {
        const { data, error } = await supabase
          .from('profiles')
          .select('score')
          .eq('id', (await supabase.auth.getUser()).data.user.id)
          .single();
        if (error) throw error;
        this.currentUserScore = data.score;
      },
      async fetchMatches() {
        const bracketFilter = this.getBracketFilter();
        const { data, error } = await supabase
          .from('profiles')
          .select('id, name, whatsapp_number, score')
          .neq('id', (await supabase.auth.getUser()).data.user.id) // Exclude current user
          .gte('score', bracketFilter.min) // Minimum score for bracket
          .lte('score', bracketFilter.max); // Maximum score for bracket
        if (error) throw error;
        this.matches = data;
      },
      getBracketFilter() {
        if (this.currentUserScore <= 40) return { min: 0, max: 40 }; // Low
        if (this.currentUserScore <= 60) return { min: 41, max: 60 }; // Moderate
        if (this.currentUserScore <= 80) return { min: 61, max: 80 }; // High
        return { min: 81, max: 100 }; // Very High
      },
      subscribeToMatches() {
        const bracketFilter = this.getBracketFilter();
        supabase
          .channel('profiles')
          .on('postgres_changes', { 
            event: '*', 
            schema: 'public', 
            table: 'profiles', 
            filter: `score=gte.${bracketFilter.min},score=lte.${bracketFilter.max}` 
          }, () => {
            this.fetchMatches(); // Refresh matches on any change
          })
          .subscribe();
      },
    },
  };
  </script>
  
  
  
  
  
  
  
  
  
  
