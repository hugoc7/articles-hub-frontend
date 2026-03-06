import { useState } from "react";
import type { CSSProperties } from "react";
import { ApiClient } from "./ApiClient";


function LoginForm() {
  const [username, setUsername] = useState("emmo.richard92@gmail.com");
  const [password, setPassword] = useState("jRzY6$Y_P:A9");

  const [userId, setUserId] = useState(0);
  const [articleId, setArticleId] = useState(0);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const apiClient = new ApiClient(); //si on pouvait eviter de creer cet objet ici ...

  const handleSubmit = (e: any) => {
    e.preventDefault(); // empêche le rechargement de la page
    
    console.log("Nom d'utilisateur :", username, "Mot de passe :", password);
    apiClient.login(username, password);
    //emma.richard92@gmail.com
    //jRzY6$Y_P:A9
    
  };
  const handleCreateUser = () => {
    console.log("Create user");
    apiClient.createUser()
  };
  const handleCreateArticle = (e: any) => {
    e.preventDefault(); 
    console.log("Create article", userId, title, content);
    apiClient.createArticle(userId, title, content);
  };
  const handleUpdateArticle = (e: any) => {
    e.preventDefault(); 
    console.log("Update article", "articleId", articleId, "userId", userId, "title", title, content);
    apiClient.updateArticle(articleId, userId, title, content);
  };
  const handleGetFavorites = (e: any) =>
  {
    e.preventDefault(); 
    console.log("getFavorites", userId);
    apiClient.getFavorites(userId)
  }
  const handleAddFavorites = (e: any) => {
    e.preventDefault(); 
    console.log("getFavorites", "articleId", articleId, "userId",userId);
    apiClient.addFavorites(articleId, userId);
  };

  return (
    <div style={styles.container}>
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.field}>
          <label>Nom d'utilisateur</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div style={styles.field}>
          <label>Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Se connecter</button>
      </form>
      <button onClick={handleCreateUser}>Create user</button>
      <h2>Articles et favoris</h2>
      <form style={styles.form}>
        <div style={styles.field}>
          <label>Identifiant utilisateur</label>
          <input
            type="number"
            value={userId}
            onChange={(e) => setUserId(parseInt(e.target.value))}
          />
        </div>
        <div style={styles.field}>
          <label>Identifiant article</label>
          <input
            type="number"
            value={articleId}
            onChange={(e) => setArticleId(parseInt(e.target.value))}
          />
        </div>

        <div style={styles.field}>
          <label>Titre</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div style={styles.field}>
          <label>Contenu</label>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <button onClick={handleCreateArticle}>Creer un article</button>
        <button onClick={handleUpdateArticle}>Mettre à jour un article</button>
        <button onClick={handleGetFavorites}>Get Favorites</button>
        <button onClick={handleAddFavorites}>Add Favorites</button>
      </form>
      
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  container: {
    width: "300px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
  },
};

export default LoginForm;