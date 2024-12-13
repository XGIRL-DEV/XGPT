import { useState, useEffect, useRef } from "react";
import supabase from "@/database/supabase";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

type Comment = {
  id: number;
  userUID: string;
  authorName: string;
  rating: number;
  comment: string;
  created_at: string;
};

type CommentsProps = {
  userUID?: string; // Opcional
};

function Comments({  }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]); // Tipagem de comments
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(0);
  const [authorName, setAuthorName] = useState("");
  const [isEmojiPickerVisible, setIsEmojiPickerVisible] = useState(false); // Controle da visibilidade do seletor de emojis
  const emojiInputRef = useRef<HTMLTextAreaElement | null>(null); // Ref para a área de texto
  const userUID = useSelector((state: any) => state.profile?.profile.userUID);
  const { t, i18n } = useTranslation();

  // Lista de emojis para o seletor
  const emojiList = ["😊", "😂", "😍", "😐", "😢", "😠", "😎", "🥳", "🤩", "🤔"];

  // Verificação de userUID
  useEffect(() => {
    if (!userUID) {
      console.error("userUID está indefinido ou inválido.");
      return;
    }
    fetchComments();
  }, [userUID]);

  const fetchComments = async () => {
    if (!userUID) return;

    try {
      const { data, error } = await supabase
        .from("comments")
        .select("*")
        .eq("userUID", userUID)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setComments(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Erro ao buscar comentários:", error.message);
      } else {
        console.error("Erro desconhecido:", error);
      }
    }
  };

  const handleCommentSubmit = async () => {
    if (!newComment.trim() || rating === 0 || !authorName.trim()) {
      alert("Por favor, preencha todos os campos e selecione uma classificação.");
      return;
    }

    try {
      const { data, error } = await supabase.from("comments").insert([
        {
          userUID,
          authorName: authorName,
          rating,
          comment: newComment,
        },
      ]);
      if (error) throw error;
      setNewComment("");
      setRating(0);
      setAuthorName("");
      fetchComments(); // Recarregar os comentários após o envio
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Erro ao enviar comentário:", error.message);
      } else {
        console.error("Erro desconhecido:", error);
      }
    }
  };

  // Função para alternar a visibilidade do seletor de emojis
  const toggleEmojiPicker = () => {
    setIsEmojiPickerVisible(!isEmojiPickerVisible);
  };

  // Função para inserir emoji no campo de comentário na posição do cursor
  const addEmojiToComment = (emoji: string) => {
    if (emojiInputRef.current) {
      const cursorPosition = emojiInputRef.current.selectionStart;
      const newText = newComment.slice(0, cursorPosition) + emoji + newComment.slice(cursorPosition);
      setNewComment(newText);
      emojiInputRef.current.selectionStart = cursorPosition + emoji.length; // Atualiza a posição do cursor após o emoji
      emojiInputRef.current.selectionEnd = cursorPosition + emoji.length;
    }
    setIsEmojiPickerVisible(false); // Fecha o seletor após selecionar o emoji
  };

  return (
    <div className="space-y-4">
      {/* Card para exibir comentários */}
      <div className="bg-gray-800 p-6 rounded-xl border border-zinc-700 shadow-md">
        <h2 className="text-pink-700 text-2xl mb-4">  {t("profile.comments")}
        </h2>
        <div className="space-y-2">
          {comments.length === 0 ? (
            <p className="text-gray-400">  {t("profile.no_comments_yet")}
</p>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="bg-gray-700 p-4 rounded-md shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, index) => (
                      <span key={index}>
                        {index < comment.rating ? (
                          <AiFillStar className="text-yellow-500" />
                        ) : (
                          <AiOutlineStar className="text-gray-500" />
                        )}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center">
                    <p className="text-pink-500 text-sm font-semibold">
                    {comment.authorName || t("profile.anonymous")}
                    </p>
                    <span className="ml-2 text-lg">😊</span> {/* Coloque o emoji aqui */}
                  </div>
                </div>
                <p className="text-white">{comment.comment}</p>
                <p className="text-gray-500 text-sm mt-2">
                  {new Date(comment.created_at).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Card para novo comentário */}
      <div className="bg-gray-800 p-6 rounded-xl border border-zinc-700 shadow-md relative">
        <h3 className="text-pink-700 text-lg mb-4">  {t("profile.leave_comment")}
        </h3>
        <input
          type="text"
          className="w-full bg-gray-800 text-white p-4 rounded-md mb-4 border border-zinc-700"
          placeholder={t("profile.write_comment_placeholder")}

          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
        />
        <div className="flex items-center mb-4">
          {[...Array(5)].map((_, index) => (
            <span key={index} onClick={() => setRating(index + 1)}>
              {index < rating ? (
                <AiFillStar className="text-yellow-500 cursor-pointer" />
              ) : (
                <AiOutlineStar className="text-gray-500 cursor-pointer" />
              )}
            </span>
          ))}
        </div>

        {/* Caixa de comentário com ref para o emoji */}
        <textarea
          ref={emojiInputRef}
          className="w-full bg-gray-800 text-white p-4 rounded-md mb-4 border border-zinc-700"
          rows={4}
          placeholder="Escreva seu comentário aqui..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />

        {/* Ícone de emoji dentro da caixa de comentário */}
        <span
          onClick={toggleEmojiPicker}
          className="absolute right-4 bottom-4 text-2xl cursor-pointer"
        >
          😀
        </span>

        {/* Seletor de emojis dentro da caixa de comentário */}
        {isEmojiPickerVisible && (
          <div className="mt-4 grid grid-cols-5 gap-2 absolute bg-white border border-gray-300 rounded-md p-2 z-10 bottom-16 right-4">
            {emojiList.map((emoji) => (
              <span
                key={emoji}
                className="text-2xl cursor-pointer"
                onClick={() => addEmojiToComment(emoji)}
              >
                {emoji}
              </span>
            ))}
          </div>
        )}

        <button
          onClick={handleCommentSubmit}
          className="bg-pink-700 text-white px-4 py-2 rounded-md hover:bg-pink-600"
        >
          {t("profile.send_comment")}
        </button>
      </div>
    </div>
  );
}

export default Comments;
