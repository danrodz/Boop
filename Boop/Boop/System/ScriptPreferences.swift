// ScriptPreferences.swift
//  Boop
//
//  Manages script favorites and recents with persistence
//

import Foundation

class ScriptPreferences {

    static let shared = ScriptPreferences()

    private let favoritesKey = "favoriteScripts"
    private let recentsKey = "recentScripts"
    private let maxRecents = 10

    private var favorites: Set<String> = []
    private var recents: [String] = []

    private init() {
        loadPreferences()
    }

    // MARK: - Persistence

    private func loadPreferences() {
        if let savedFavorites = UserDefaults.standard.array(forKey: favoritesKey) as? [String] {
            favorites = Set(savedFavorites)
        }

        if let savedRecents = UserDefaults.standard.array(forKey: recentsKey) as? [String] {
            recents = savedRecents
        }
    }

    private func saveFavorites() {
        UserDefaults.standard.set(Array(favorites), forKey: favoritesKey)
    }

    private func saveRecents() {
        UserDefaults.standard.set(recents, forKey: recentsKey)
    }

    // MARK: - Favorites

    func isFavorite(_ scriptID: String) -> Bool {
        return favorites.contains(scriptID)
    }

    func toggleFavorite(_ scriptID: String) {
        if favorites.contains(scriptID) {
            favorites.remove(scriptID)
        } else {
            favorites.insert(scriptID)
        }
        saveFavorites()
    }

    func addFavorite(_ scriptID: String) {
        favorites.insert(scriptID)
        saveFavorites()
    }

    func removeFavorite(_ scriptID: String) {
        favorites.remove(scriptID)
        saveFavorites()
    }

    func getFavorites() -> Set<String> {
        return favorites
    }

    // MARK: - Recents

    func addRecent(_ scriptID: String) {
        // Remove if already exists (to move to front)
        recents.removeAll { $0 == scriptID }

        // Add to front
        recents.insert(scriptID, at: 0)

        // Trim to max size
        if recents.count > maxRecents {
            recents = Array(recents.prefix(maxRecents))
        }

        saveRecents()
    }

    func getRecents() -> [String] {
        return recents
    }

    func clearRecents() {
        recents.removeAll()
        saveRecents()
    }
}
