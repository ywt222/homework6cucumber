package controller;

import model.Bookmark;
import net.sf.json.JSONArray;
import util.BookList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;


@WebServlet("/search")
public class search extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setCharacterEncoding("UTF-8");
        String keywords = req.getParameter("keywords");
        if (keywords.equals("")) {
            resp.getWriter().write(JSONArray.fromObject(BookList.getBookListInstance().booklist).toString());
        } else {
            ArrayList<Bookmark> booklist = BookList.getBookListInstance().booklist;
            ArrayList<Bookmark> result = new ArrayList<>();
            for (Bookmark temp : booklist) {
                if (temp.getTitle().toLowerCase().contains(keywords.toLowerCase()))
                    result.add(temp);
            }
            resp.getWriter().write(JSONArray.fromObject(result).toString());
            System.out.println("关键字是"+keywords+"搜索到"+result.size()+"个结果");
        }
    }
}
